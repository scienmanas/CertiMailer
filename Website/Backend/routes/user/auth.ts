import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
import User from "../../models/user";
import { multerErrorHandler } from "../../middlewares/multerErrorHandler";
import { sendMail } from "../../helpers/mailer";
import { verifyOtp } from "../../helpers/otp";
import { uploadFile } from "../../helpers/cloud-bucket";
import { createFolder } from "../../helpers/cloud-bucket";
import multer from "multer";
import path from "path";
import fs from "fs";

// Initialse the router & multer
const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save files temporarily
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1 }, // File size limit = 1MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

// Route - 1: Register a new User
router.post(
  "/register",
  upload.single("logo"),
  multerErrorHandler,
  async (req: Request, res: Response) => {
    const parsedBody = Object.assign({}, req.body);
    const { name, email, info, type, otp } = parsedBody;
    const logoFile = req.file;

    if (!logoFile) return res.status(400).json({ message: "Logo is required" });
    if (!name || !email || !info || !type || !otp)
      return res.status(400).json({ message: "All fields are required" });

    try {
      // Verify the OTP
      const otpVerify = await verifyOtp({ userId: email, otp: parseInt(otp) });
      if (otpVerify.status === 400 || otpVerify.status === 500)
        return res
          .status(otpVerify.status)
          .json({ message: otpVerify.message });

      // Check if the user already applied
      let user = await User.findOne({ email: email });
      if (user)
        return res
          .status(400)
          .json({ message: "User/Application already exists" });

      // If the user does not exist then create a new application
      // Upload the logo to the cloud bucket
      const userId = new ObjectId();
      let logoUrl = "";
      const folderName = `${userId}`;
      // Create folders for the user
      await createFolder({ folderPath: null, folderName: folderName });
      await createFolder({ folderPath: folderName, folderName: "logo" });
      await createFolder({
        folderPath: folderName,
        folderName: "ids",
      });
      // Upload the logo
      const uploadResult = await uploadFile({
        folderName: `${folderName}/logo`,
        fileName: "logo",
        localFilePath: logoFile.path,
      });
      // Get logo url
      if (uploadResult.status === 500)
        return res.status(500).json({ message: "Internal Server Error" });
      logoUrl = uploadResult.publicUrl as string;

      // Create the user
      user = await User.create({
        _id: userId,
        name: name,
        email: email,
        info: info,
        type: type,
        logoUrl: logoUrl,
        status: "unverified",
        approved: false,
      });

      // Return response
      res.status(201).json({ message: "User Created" });
      // Send mail to user & Admin
      await sendMail({
        fromName: "Admin - CertiMailer",
        toEmail: email,
        toName: name,
        subject: "Application Received ✨",
        message: `Hi ${name}! ✨\n\nThank you so much for applying to CertiMailer—you're amazing! 🤩\n\nJust a quick note to let you know that your application has been received and is under review. We will get back to you soon.\n\nHere are the details you submitted:\n\nName: ${name}\nEmail: ${email}\nType: ${type}\nInfo: ${info}\n\nEven though this is an automated email sent from the server, I personally crafted this message to make it more special 😉. Your application is important to us, and we’ll keep you updated every step of the way!\n\nFeel free to reply to this email if you have any questions—we check our inbox regularly 📬 and love connecting with amazing people like you!\n\nStay tuned for some exciting news! Until then, take care and cheers! 🥂\n\n--\n\nManas Poddar\n📧 Email: manas@certimailer.xyz\n🐙 Github: https://github.com/scienmanas\n🌐 Web: https://scienmanas.xyz`,
      });
      await sendMail({
        fromName: "Admin - CertiMailer",
        toEmail: "manas@certimailer.xyz",
        toName: "Manas",
        subject: "New Application Received 📝",
        message: `Hi Manas! 👋\n\nA new application has been received. Here are the details:\n\nName: ${name}\nEmail: ${email}\nType: ${type}\nInfo: ${info}\n\nPlease review the application and take necessary action.\n\nThanks! 😊`,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      // Ensure deletion of the file
      if (logoFile) {
        fs.unlink(logoFile.path, (err) => {
          if (err) console.log(`Error deleting file: ${err}`);
        });
      }
    }
  }
);

// Route - 2: Authenticate and generate a JWt Token
router.post("/login", async (req: Request, res: Response) => {
  // Get the JWT Secret
  const JWT_SECRET = process.env.JWT_SECRET as string;

  // Get email and password
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email: email });

    // If no user then nothing or undefined is returned
    if (user === null || user === undefined)
      return res.status(404).json({ message: "Not found" });
    if (user.approved === false)
      return res.status(400).json({ message: "Application not approved" });

    // Compare password for authentication
    const passwordCompare = await bycrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get the uuser id and store it in a nice format
    const data = { user: { id: user._id } };
    const authToken = jwt.sign(data, JWT_SECRET);
    res
      .cookie("authToken", authToken, {
        httpOnly: true,
        secure: process.env.ENV === "prod",
        sameSite: process.env.ENV === "prod" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week expiry
        path: "/",
        domain: process.env.ENV === "prod" ? process.env.DOMAIN : "localhost",
      })
      .status(200)
      .json({
        message: "Authenticated",
        // Don't send authToken in JSON for security
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 3: Check the JWT Token
router.get("/validate", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    res.status(200).json({ message: "User Validated" });
  } catch (error) {
    res.status(400).json({ message: "Unathorized" });
  }
});

// Route - 4: Logout the user
router.get("/logout", async (req: Request, res: Response) => {
  res
    .clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.ENV === "prod",
      sameSite: process.env.ENV === "prod" ? "strict" : "lax",
      path: "/",
      domain: process.env.ENV === "prod" ? process.env.DOMAIN : "localhost",
    })
    .status(200)
    .json({ message: "Logged out" });
});

export default router;

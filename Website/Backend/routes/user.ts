import { Router, Request, Response, NextFunction } from "express";
import { randomBytes } from "crypto";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Newsletter from "../models/newsletter";
import PendingUser from "../models/pending-user";
import User from "../models/user";
import { sendMail } from "../helpers/mailer";

// Make router
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Mae jinda hu bhai" });
});

// Route - 1 : Add user to newsletter
router.post("/newsletter", async (req: Request, res: Response) => {
  // Get the body
  const { email } = req.body;
  try {
    // Check if user already exists
    const user = await Newsletter.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // insert data
    const data = await Newsletter.create({ email: email });
    res.status(201).json({ message: "Successfully added user to waitlist" });
    await sendMail({
      fromName: "Manas",
      toEmail: email,
      message:
        "Hi there! ✨\n\nThank you so much for subscribing to the newsletter—you're amazing! 🤩 Just a quick note to let you know that your subscription has been successfully added.\n\nEven though this is an automated email sent from the server, I personally crafted this template, so it’s more than just a system message 😉. I’m super excited to share updates, insights, and stories with you in the upcoming newsletters.\n\nFeel free to reply to this email if you ever have any questions or feedback—I check my inbox regularly 📬 and love connecting with awesome people like you!\n\nAlright, that’s all for now! Stay tuned for some exciting content heading your way. Until then, take care and cheers! 🥂\n\n--\n\nManas Poddar\n📧 Email: manas@certimailer.xyz\n🐙 Github: https://github.com/scienmanas\n🌐 Web: https://scienmanas.xyz",
      subject: "Subscribed to Newsletter 💌",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/pending-list", async (req: Request, res: Response) => {
  // OTP Endpoint
  const OTP_ENDPOINT = "http://localhost:5000/api/utils/send-otp";
  const EMAIL_API = "http://localhost:5000/api/send-email/test";
  const JWT_SECRET = process.env.JWT_SECRET as string;

  // Get the body data
  const { name, email } = req.body;

  try {
    // Create user in pending list
    const data = await PendingUser.create({
      name: name,
      email: email,
    });

    console.log(data);

    let response = await fetch(OTP_ENDPOINT, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data._id,
      }),
    });

    if (response.status === 500) {
      const ErrorData = await response.json();
      console.log(ErrorData.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Get the response otp
    let responseData = await response.json();
    const otp = responseData.value;

    // Generate token
    const signupToekn = jwt.sign({ otp }, JWT_SECRET, { expiresIn: "15d" });
    console.log(signupToekn);

    // Give cookie
    res.cookie("jwt", signupToekn, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
      // secure: process.env.NODE_ENV !== "development",
    });

    console.log(req.cookies);

    response = await fetch(EMAIL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromName: "No-Reply",
        toName: name,
        toEmail: email,
        subject: "OTP for registartion",
        message: `Hi, ${name}\nUse the below otp for verification for registration. The otp is only valid for 5 minutes. Please donot share this otp with anyone \n\nOTP: ${otp}\n\nTeam CertiMailer\n(Open Source)`,
      }),
    });

    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 3: Add to the pending user - only for admin
// --------------------- To Test-----------------
router.put("/pending-list", async (req: Request, res: Response) => {
  // Get the body
  const { name, email, type, logo_url, about, website, designation, reason } =
    req.body;

  console.log(req.body);

  try {
    await PendingUser.create({
      name: name,
      email: email,
      type: type,
      logo_url: logo_url,
      about: about,
      website: website,
      designation: designation,
      reason: reason,
    });
    res.status(201).json({ message: "User added to pending list" });
  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Route - 4: See the pending user - only for admin
router.get("/pending-list", async (req: Request, res: Response) => {
  // Get the params
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) | 20;
  const skip: number = (page - 1) * limit;

  // Get all users in pending list
  try {
    const data = await PendingUser.find()
      .sort({ date_of_request: -1 })
      .skip(skip)
      .limit(limit);

    // Get the total number of items
    const total = await PendingUser.countDocuments();

    res.status(200).json({
      page: page,
      total_pages: Math.ceil(total / limit),
      limit: limit,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 5: Cancel user - only for admin
router.delete("/pending-list", async (req: Request, res: Response) => {
  // Get the body
  const { _id } = req.body;

  try {
    await PendingUser.deleteOne({ _id: _id });
    res.status(200).json({ message: "Pending user removed successfullt" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 6: Approve user account
// ---------------------- Testing Remaining --------------------
// Testing of verification -auth and option of logo upload needs to be done
router.post("/create-user", async (req: Request, res: Response) => {
  // const EMAIL_API = "http://localhost:5000/api/send-email/admin";
  const EMAIL_API = "http://localhost:5000/api/send-email/test";
  // const EMAIL_API = "http://certimailer.onrender.com/api/send-email/admin"

  // Get the body
  const { _id, name, email, logo_url, status } = req.body;

  // Generate a random password
  const randomPassword = randomBytes(12).toString("base64").slice(0, 12);

  // Use bcrypt
  const salt = await bycrypt.genSalt(10);
  const secPass = await bycrypt.hash(randomPassword, salt);

  try {
    await User.create({
      _id: _id,
      name: name,
      email: email,
      password: secPass,
      logo_url: logo_url,
      status: status,
    });

    // Email data with confidential information like password
    const emailData = {
      fromName: "Manas",
      toName: name,
      toEmail: email,
      subject: "[Confidential]: CertiMailer credentials",
      message: `Hi, ${name}, your organization has been approved by the user. Below you can find the credentials for login to your account.\n\nEmail: ${email}\nPassword: ${randomPassword}\n\nPlease note that this email is confidential to you and you should not share your credentials with anyone. If your account is breached inform us at earliest.\n\nAlso since we are open source, if any suspecious activity found, you account will be permanently terminated.\n\nBest Regards\nTeam CertiMailer\n(Open Source)`,
    };

    // Email the user by hitting the endpoint
    await fetch(EMAIL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    // Send the response back
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 7: Display all users account on admin pannel
// ---------------------- Testing Remaining --------------------
router.get("/all-users", async (req: Request, res: Response) => {
  try {
    // query the database
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 8 : Check if request or user already exists
router.post("/check-user", async (req: Request, res: Response) => {
  // Get the email from the body
  const { email } = req.body;

  try {
    // Check in user database
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "User Already exist" });
    }

    // Check in pending database
    user = await PendingUser.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "Request Already Submitted" });
    }

    res.status(200).json({ message: "No user/requests found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Router - 9: Flagged user checking

// Pending - One more admin route to get all the data of the user on admin pannel

export default router;

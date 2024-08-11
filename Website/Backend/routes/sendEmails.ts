import { Router, Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import multer from "multer";

const router = Router();
const PORT: number = 465;
const storage = multer.memoryStorage(); // Store the files in memory
const upload = multer({ storage });

// Default Route for status
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "200 OK Hello :)" });
});

// Route - 1: Mailing by admin credentials
router.post(
  "/admin",
  upload.single("file"),
  async (req: Request, res: Response) => {
    // Get the body
    const { fronName, toName = "", toEmail, subject, message } = req.body;

    // Get the uploaded file
    const file = req.file;

    // Get the auth parameters
    const EMAIL = process.env.ADMIN_EMAIL;
    const PASSWORD = process.env.ADMIN_APP_PASSWORD;
    console.log(EMAIL);
    console.log(PASSWORD);
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: PORT,
      secure: true, //Use SSL
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    // Mail options
    const mailOptions: nodemailer.SendMailOptions = {
      from: `${fronName} <${EMAIL}>`,
      to: `${toName} <${toEmail}>`,
      subject: subject,
      text: message,
    };

    // If file is there the attach it
    if (file) {
      mailOptions.attachments = [
        {
          filename: file.originalname,
          content: file.buffer,
          encoding: "base64",
        },
      ];
    }

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Route - 2: Mailing by Test credentials (Dev mode)
router.post(
  "/test",
  upload.single("file"),
  async (req: Request, res: Response) => {
    // Get the body
    const { fromName, toName = "", toEmail, subject, message } = req.body;

    // Get the uploaded file
    const file = req.file;

    // Get the auth parameters
    const EMAIL = process.env.TEST_EMAIL;
    const PASSWORD = process.env.TEST_APP_PASSWORD;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtppro.zoho.in",
      port: PORT,
      secure: true, //Use SSL
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    // Mail options
    const mailOptions: nodemailer.SendMailOptions = {
      from: `${fromName} <${EMAIL}>`,
      to: `${toName} <${toEmail}>`,
      subject: subject,
      text: message,
    };

    // If file is there the attach it
    if (file) {
      mailOptions.attachments = [
        {
          filename: file.originalname,
          content: file.buffer,
          encoding: "base64",
        },
      ];
    }

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
      res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Route - 3: Mailing by user credentials
router.post(
  "/user-own",
  upload.single("file"),
  async (req: Request, res: Response) => {
    // Get the body as well as auth credentials
    const {
      fromName,
      toName,
      toEmail,
      subject,
      message,
      EMAIL,
      PASSWORD,
      host,
    } = req.body;

    // Get the uploaded file
    const file = req.file;

    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: host,
      port: PORT,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    // Mail options
    const mailOptions: nodemailer.SendMailOptions = {
      from: `${fromName} <${EMAIL}>`,
      to: `${toName} <${toEmail}>`,
      subject: subject,
      text: message,
    };

    // If file is there the attach it
    if (file) {
      mailOptions.attachments = [
        {
          filename: file.originalname,
          content: file.buffer,
          encoding: "base64",
        },
      ];
    }

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;

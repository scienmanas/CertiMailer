import { Router, Request, Response, NextFunction } from "express";
import { randomBytes } from "crypto";
import bycrypt from "bcryptjs";
import { waitlistParams } from "../lib/definitions";
import { newsLetterParams } from "../lib/definitions";
import Waitlist from "../models/waitlist";
import Newsletter from "../models/newsletter";
import PendingUser from "../models/pending-user";
import User from "../models/user";

// Make router
const router = Router();

// Route - 1 : Insert wailist user
router.post("/newsletter-insert-user", async (req: Request, res: Response) => {
  // Get the body
  const userData: newsLetterParams = req.body;

  try {
    // insert data
    const data = await Newsletter.create(userData);
    res.status(201).json({ message: "Successfully added user to waitlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 2: Insert email to newsletter
router.post("/waitlist-insert-user", async (req: Request, res: Response) => {
  // Get the body
  const email: waitlistParams = req.body;

  try {
    // Insert data
    const data = await Waitlist.create(email);
    res.status(201).json({ message: "Successfully added user to newsletter" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 3: Add to the pending user - only for admin
// --------------------- To Test-----------------
router.post("/pending-list", async (req: Request, res: Response) => {
  // Get the body
  const { name, email, logo_url, status, designation, message } = req.body;

  try {
    await PendingUser.create({
      name: name,
      email: email,
      logo_url: logo_url,
      status: status,
      designation: designation,
      message: message,
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

// Pending - One more admin route to get all the data of the user on admin pannel

export default router;

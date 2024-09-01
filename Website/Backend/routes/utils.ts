import { Router, Request, Response } from "express";
import crypto from "crypto";
import Otp from "../models/otp";

const router = Router();

// Route - 1: For generating temporary otp when user registers for the first time
router.post("/send-otp", async (req: Request, res: Response) => {
  // Destructure the email data
  const { user_id } = req.body;
  const EMAIL_API = "http://localhost:5000/api/send-email/test";

  try {
    //Generate the otp
    const otp = crypto.randomInt(1000, 9999);

    // Embedded it to database
    await Otp.create({
      user_id: user_id,
      otp: otp,
    });

    // Send success message and otp
    res.status(200).json({ message: "Success", value: otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/verify-otp", (req: Request, res: Response) => {
  res.status(200).json({ message: "Sab ok ha" });
});

export default router;

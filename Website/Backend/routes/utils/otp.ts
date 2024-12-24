import { Router, Request, Response } from "express";
import { generateOtp, verifyOtp } from "../../helpers/utils/otp";
import { sendMail } from "../../helpers/utils/mailer";
import { validateEmail } from "../../helpers/validators/data-validators";

const router = Router();

// Route - 1: For generating temporary otp when user registers for the first time
router.post("/get-otp", async (req: Request, res: Response) => {
  // Destructure the email data
  const { userId, email } = req.body;
  if (
    userId === undefined ||
    email === undefined ||
    validateEmail(email) == false
  )
    return res.status(400).json({ message: "Invalid passing data" });

  const otp = await generateOtp({ userId: userId });
  await sendMail({
    fromName: "Admin CertiMailer",
    toEmail: email,
    subject: "OTP - CertiMailer",
    message: `Hi there! 👋\n\nYour OTP (One-Time Password) for accessing CertiMailer is: ${otp}\n\nPlease use this code to proceed. It is valid for the next 2 hrs.\n\nIf you didn't request this OTP, please ignore this email or contact us.\n\nStay secure,\nThe CertiMailer Team\n📧 manas@certimailer.xyz`,
  });
  res.status(200).json({ message: "OTP sent successfully" });
});

export default router;

// Route - 2: For verifying the otp
router.post("/verify-otp", async (req: Request, res: Response) => {
  const { userId, otp } = req.body;
  if (userId === undefined || otp === undefined)
    return res.status(400).json({ message: "Invalid passing data" });

  const response = await verifyOtp({ userId: userId, otp: otp });
  res.status(response.status).json({ message: response.message });
});

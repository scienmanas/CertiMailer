import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

router.get("/otp", async (req: Request, res: Response) => {
  try {
    const otp = crypto.randomInt(100000, 999999);

    // send the otp
    res.status(200).json({ value: otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

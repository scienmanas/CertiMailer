import mongoose, { Types } from "mongoose";
import crypto from "crypto";
import Otp from "../models/otp";

interface IOtp extends mongoose.Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  otp: number;
  timeStamp: Date;
}

export async function generateOtp({ userId }: { userId: string }) {
  const otp = crypto.randomInt(100000, 999999);

  // Embedded it to database
  await Otp.create({
    userId: userId,
    otp: otp,
    timeStamp: new Date(Date.now()),
  });

  return otp;
}

export async function verifyOtp({
  userId,
  otp,
}: {
  userId: string;
  otp: number;
}) {
  // validate input
  if (!userId || !otp) {
    return {
      status: 400,
      message: "Invalid OTP",
    };
  }

  try {
    // Find the latest otp
    const latestOtp: IOtp | null = await Otp.findOne({ userId: userId }).sort({
      timeStamp: -1,
    });

    if (!latestOtp) return { status: 400, message: "Invalid request" };

    // Check if otp don't exists
    if (!latestOtp) {
      return {
        status: 400,
        message: "Invalid request",
      };
    }
    // Check if otp don't matches
    else if (latestOtp.otp !== otp) {
      return {
        status: 400,
        message: "Invalid OTP",
      };
    }
    // Check OTP expiration (2 hours = 7200000 milliseconds)
    const currentTime: number = Date.now();
    const otpGenerationTime: number = latestOtp.timeStamp.getTime();
    const timeDifference: number = currentTime - otpGenerationTime;

    if (timeDifference > 7200000) {
      await latestOtp.deleteOne();
      return {
        status: 400,
        message: "Otp has expired",
      };
    }
    await latestOtp.deleteOne();
    return {
      status: 200,
      message: "OTP verified successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

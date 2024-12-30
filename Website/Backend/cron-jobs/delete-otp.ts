import cron from "node-cron";
import Otp from "../models/otp";

export default function deleteOtp() {
  cron.schedule("0,30,59 * * * *", async () => {
    // Delete expired OTP
    const currentTime: number = Date.now() - 2 * 60 * 60 * 1000;
    const result = await Otp.deleteMany({ timeStamp: { $lt: currentTime } });
    // Log
    console.log(`Deleted ${result.deletedCount} OTPs older than 2 hours.`);
  });
}

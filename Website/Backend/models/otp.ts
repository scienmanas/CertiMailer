import mongoose, { Schema } from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    userId: {
      type: String,
      required: true,
    },
    otp: { type: Number, required: true },
    timeStamp: { type: Date, required: true, default: Date.now },
  },
  {
    collection: "otp",
  }
);

export default mongoose.models.Otp || mongoose.model("OTP", OtpSchema);

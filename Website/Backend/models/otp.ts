import mongoose, { Schema } from "mongoose";

const OtpSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    default:() => new mongoose.Types.ObjectId(),
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  otp: { type: Number, required: true },
  time_stamp: { type: String, required: true, default: Date.now() },
});

export default mongoose.models.Otp || mongoose.model("OTP", OtpSchema);

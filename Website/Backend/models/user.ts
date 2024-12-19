import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    logoUrl: { type: String, required: true },
    status: { type: String, enum: ["verified", "unverified"], required: true },
    about: { type: String, required: false },
    info: { type: String, required: true },
    type: { type: String, enum: ["personal", "organization"], required: true },
    approved: { type: Boolean, required: true, default: false },
    maxAllocatedEvents: { type: Number, required: true, default: 5 },
    totalEvents: { type: Number, required: true, default: 0 },
    date: { type: Date, required: true, default: Date.now },
  },
  {
    collection: "user",
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

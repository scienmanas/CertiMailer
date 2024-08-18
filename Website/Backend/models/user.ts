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
    password: { type: String, required: true },
    logo_url: { type: String, required: true },
    status: { type: String, enum: ["verified", "unverified"], required: true },
  },
  {
    collection: "user",
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

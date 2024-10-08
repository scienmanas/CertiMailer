import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    logo_url: { types: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: "user",
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";

const flaggedUserchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    registered: { type: String, required: true, enum: ["yes", "no"] },
    time_stamp: { type: String, require: true, default: Date.now },
    severity: {
      type: String,
      required: true,
      enum: ["yellow", "red"],
    },
  },
  {
    collection: "flagged",
  }
);

export default mongoose.models.FlaggedUser ||
  mongoose.model("FlaggedUser", flaggedUserchema);

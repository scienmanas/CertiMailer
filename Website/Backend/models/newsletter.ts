import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: false },
    date: { type: Date, default: Date.now },
  },
  {
    collection: "newsletter",
  }
);

export default mongoose.models.newsLetter ||
  mongoose.model("newsLetter", newsLetterSchema);

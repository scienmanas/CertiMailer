import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: false }
    },
    {
        collection: 'newsletter'
    }
);

export default mongoose.models.newsLetter || mongoose.model('newsLetter', newsLetterSchema)
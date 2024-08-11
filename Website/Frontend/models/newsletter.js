import mongoose from "mongoose";

const newsLetterUserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: false }
    },
    {
        collection: 'newsletterusers'
    }
);

export default mongoose.models.newsLetterUser || mongoose.model('newsLetterUser', newsLetterUserSchema)
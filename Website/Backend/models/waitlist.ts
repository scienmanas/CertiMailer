import mongoose from "mongoose";

const WaitListSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        collection: ' waitlist'   // collection in which the data is saved
    }
);

export default mongoose.models.waitList || mongoose.model('waitUser', WaitListSchema)

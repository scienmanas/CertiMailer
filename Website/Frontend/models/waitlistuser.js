import mongoose from "mongoose";

const WaitListUserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        collection: ' waitlistusers'   // collection in which the data is saved
    }
);

export default mongoose.models.waitListUser || mongoose.model('waitListUser', WaitListUserSchema)

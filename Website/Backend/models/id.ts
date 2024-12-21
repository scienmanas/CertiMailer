import mongoose, { Schema } from "mongoose";

const idSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    organizationId: {
      type: String,
      required: true,
    },
    idtype: { type: String, required: true },
    eventId: { type: String, required: true },
    issuedTo: { type: String, required: true },
    issuedEmail: { type: String, required: true },
    issuedDate: { type: String, required: true, default: Date.now }, // default to current date
    expiryDate: { type: String, required: true },
  },
  {
    collection: "id",
  }
);

export default mongoose.models.Id || mongoose.model("Id", idSchema);

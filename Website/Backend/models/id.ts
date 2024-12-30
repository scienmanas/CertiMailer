import mongoose, { Schema } from "mongoose";

const idSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    idType: { type: String, required: true },
    issuedTo: { type: String, required: false },
    issuedEmail: { type: String, required: false },
    issuedDate: { type: Date, required: true, default: Date.now }, // default to current date
    expiryDate: { type: String, required: true },
    textPosition: { type: Array, required: true },
  },
  {
    collection: "id",
  }
);

export default mongoose.models.Id || mongoose.model("Id", idSchema);

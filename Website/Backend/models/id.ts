import mongoose, { Schema } from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    organization_logo_url: { type: String, required: true },
    organization_name: { type: String, required: true },
    organization_id: { type: String, required: true },
    organization_status: {
      type: String,
      enum: ["verified", "unverified"],
      required: true,
    },
    organization_email: { type: String, required: true },
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    issued_to: { type: String, required: true },
    issued_email: { type: String, required: true },
    issued_date: { type: String, required: true },
    expiry_date: { type: String, required: true },
  },
  {
    collection: "certificates",
  }
);

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);

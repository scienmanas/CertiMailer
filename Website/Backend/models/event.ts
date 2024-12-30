import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventName: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventType: { type: String, required: true },
  },
  {
    collection: "event",
  }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);

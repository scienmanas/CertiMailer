import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  organizationId: {
    type: String,
    required: true,
  },
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventType: { type: String, required: true },
});

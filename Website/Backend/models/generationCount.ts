import mongoose, { Schema } from "mongoose";

const generationCountSchema = new mongoose.Schema(
  {
    total: { type: Number, required: true, default: 0 },
    publicGeneration: { type: Number, required: true, default: 0 },
    loggedInGeneration: { type: Number, required: true, default: 0 },
  },
  { collection: "generationCount" }
);

export default mongoose.models.GenerationCount ||
  mongoose.model("GenerationCount", generationCountSchema);

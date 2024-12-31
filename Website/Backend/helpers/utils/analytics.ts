import GenerationCount from "../../models/generationCount";

// Save total number of id/certificate generated so far
export async function updateGenerationCount({
  total,
  publicGeneration,
  loggedInGeneration,
}: {
  total: { number: number; update: boolean };
  publicGeneration: { number: number; update: boolean };
  loggedInGeneration: { number: number; update: boolean };
}) {
  // Build the increment object dynamically based on which counts need updating
  const incrementFields: { [key: string]: number } = {};

  if (total.update === true) incrementFields.total = total.number;
  if (publicGeneration.update === true)
    incrementFields.publicGeneration = publicGeneration.number;
  if (loggedInGeneration.update === true)
    incrementFields.loggedInGeneration = publicGeneration.number;

  await GenerationCount.findOneAndUpdate(
    {},
    { $inc: incrementFields },
    { upsert: true, new: true, lean: true }
  );

  try {
  } catch (error) {
    console.error("Failed to update generation count", error);
  }
}

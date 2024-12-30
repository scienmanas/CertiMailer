import mongoose from "mongoose";

export async function connectToDB(): Promise<void> {
  const env: string = process.env.ENV as string;
  let MONGO_URI: string = "";
  if (env === "dev") MONGO_URI = process.env.MONGO_DEV_URI as string;
  else if (env === "prod") MONGO_URI = process.env.MONGO_PROD_URI as string;
  else if (env === "test") MONGO_URI = process.env.MONGO_TEST_URI as string;
  else console.error("Invalid Environment");
  try {
    // logs
    console.log("Connecting to Mongo Db :|");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongo DB :)");
  } catch (error) {
    console.log("Unable to connect to Mongo DB T_T");
    console.log(error);
  }
}

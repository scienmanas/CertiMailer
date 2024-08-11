import mongoose from "mongoose";

export async function connectToDB(): Promise<void> {
  try {
    // Database Uri
    const MONGO_URI: string = process.env.MONGO_TEST_URI as string;
    // const MONGO_URI: string = process.env.MONGO_PROD_URI as string;

    // logs
    console.log("Connecting to Mongo Db :|");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongo DB :)");
  } catch (error) {
    console.log("Unable to connect to Mongo DB T_T");
    console.log(error);
  }
}

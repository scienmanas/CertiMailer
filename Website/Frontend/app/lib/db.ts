"use server";

import mongoose from "mongoose";

export const connectToMongoDB = async (url: string | undefined) => {

  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to DB :)")
    return
  }

  if (!url) {
    throw new Error("Database URL error");
  }

  // connect to speficfic mongoose databsse
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB  :)");
  } catch (error) {
    console.log("Error is connecting to MongoDB :(");
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

export const disconnectFromMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      // close the previous connection
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    } catch (error) {
      console.log("Error on closing connection");
      console.log(error);
      throw new Error("Failed to disconnect from MongoDB");
    }
  } else return;
};


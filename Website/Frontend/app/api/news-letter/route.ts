import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/lib/db";
import newsLetterUser from "@/models/newsletter";

export async function POST(request: Request) {
  const DB_URL: string | undefined = process.env.MONGODB_URL;

  // connect to database
  await connectToMongoDB(DB_URL);

  const { email } = await request.json();

  try {
    // create a new instance with the parsed data
    const user_data = new newsLetterUser({ email });

    // save the data
    await user_data.save();

    // Send the response (sucess)
    return NextResponse.json(
      {
        success: true,
        data: user_data,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.log(error);
    // Send the failure response
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}

import { NextResponse } from "next/server";
import waitListUser from "@/models/waitlistuser";
import { connectToMongoDB } from "@/app/lib/db";

export async function POST(request: Request) {
  const DB_URL: string | undefined = process.env.MONGODB_URL;

  // connect to latest database
  await connectToMongoDB(DB_URL);

  //   Parse the request body
  const { name, designation, email } = await request.json();

  try {
    // Create a new user instance with the parsed data
    const user_data = new waitListUser({ name, designation, email });

    // Save the user to the database
    await user_data.save();

    // Send a success response with the saved user data
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
    // Send an error response with the error message
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  return NextResponse.json(
    {
      status: "200 OK"
    }
  )
}
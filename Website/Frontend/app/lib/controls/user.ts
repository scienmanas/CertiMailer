"use client";
export function getUserData() {
  const API_URI = new URL(process.env.NEXT_PUBLIC_BACKEND_URI + "/user/data");

  try {
    // const response: Response = await 
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

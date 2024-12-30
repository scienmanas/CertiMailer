"use client";
export async function getUserData() {
  const API_URI = new URL(process.env.NEXT_PUBLIC_BACKEND_URI + "/user/home-data");

  try {
    const response: Response = await fetch(API_URI.toString(), {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return {
      status: response.status,
      message: data.message,
      userData: data.data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

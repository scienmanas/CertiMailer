"use client";

export async function SubscribeToNewsletter(email: string) {
  // Backend URI from environment variables
  const API_URI: string = (process.env.NEXT_PUBLIC_BACKEND_URI +
    "/user/newsletter") as string;

  // API request to handle newsletter subscription
  try {
    const response: Response = await fetch(API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }), // Send email as payload
    });
    return {
      status: response.status,
      message: response.statusText,
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
}

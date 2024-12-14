"use server";

export async function SubscribeToNewsletter(email: string) {
  // Backend URI from environment variables
  const API_URI: string = (process.env.BACKEND_URI +
    "/user/newsletter") as string;
  console.log(API_URI);

  // API request to handle newsletter subscription
  try {
    const response: Response = await fetch(API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }), // Send email as payload
    });
    console.log(response.status);
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

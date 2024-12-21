"use client";

export async function getIdDetails({ id }: { id: string }) {
  const API_URI = new URL(process.env.NEXT_PUBLIC_BACKEND_URI + "/id/details");

  try {
    const response: Response = await fetch(API_URI.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const data = await response.json();
    return {
      status: response.status,
      data: data.data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

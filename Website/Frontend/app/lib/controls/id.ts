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

export async function generateUnlimitedId(formData: FormData) {
  const API_URI = new URL(process.env.NEXT_PUBLIC_BACKEND_URI + "/id/generate");

  try {
    const response: Response = await fetch(API_URI.toString(), {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      const blob = await response.blob();
      return {
        status: response.status,
        message: "Success",
        blob: blob,
      };
    } else {
      const data = await response.json();
      return {
        status: response.status,
        message: data.message,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

"use client";

// Get the OTP
export async function getOtp({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const API_URI = new URL(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/utils/get-otp"
  );

  try {
    const response = await fetch(API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        email: email,
      }),
    });
    const data = await response.json();
    return {
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

// Handle Registion
export async function handleRegister(formData: FormData) {
  const API_URI = new URL(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/auth/register"
  );
  try {
    const response: Response = await fetch(API_URI, {
      method: "POST",
      body: formData,
    });
    // Parse the data
    const data = await response.json();
    return {
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

// Handle Login
export async function handleLogin({
  email,
  password,
  rememberMe,
}: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const API_URI = new URL(process.env.NEXT_PUBLIC_BACKEND_URI + "/auth/login");

  try {
    // Fetch the auth token
    const response: Response = await fetch(API_URI.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        rememberMe: rememberMe,
      }),
      credentials: "include",
    });

    // Parse the response and login
    const data = await response.json();
    if (response.status === 200)
      return {
        status: response.status,
        message: data.message,
        authToken: data.authToken,
      };
    else
      return {
        status: response.status,
        message: data.message,
      };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

// Handle Logout
export async function handleLogout() {
  const API_URI = new URL(process.env.NEXT_PUBLIC_BACKEND_URI + "/auth/logout");

  try {
    const response = await fetch(API_URI.toString(), {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return {
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

// Validate the credentials
export async function validateCredentials() {
  const API_URI = new URL(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/auth/validate"
  );

  try {
    const response = await fetch(API_URI.toString(), {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return {
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

// Request for password reset
export async function handleResetPassword({
  email,
  password,
  otp,
}: {
  email: string;
  password: string;
  otp: string;
}) {
  const API_URI = new URL(
    process.env.NEXT_PUBLIC_BACKEND_URI + "/auth/reset-password"
  );

  try {
    const response = await fetch(API_URI.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        otp: otp,
      }),
    });
    const data = await response.json();
    return {
      status: response.status,
      message: data.message,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

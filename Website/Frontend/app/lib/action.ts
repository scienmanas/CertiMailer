"use server";

import { z } from "zod";
import { emailParams } from "@/app/lib/definitions";

// *******************  Schema functions **********************

const waitListUserSchema = z.object({
  name: z.string({
    invalid_type_error: "Please enter the name",
  }),
  designation: z.string({
    invalid_type_error: "Please choose a designation",
  }),
  email: z.string().email(),
});

const newsLetterEmailSchema = z.object({
  email: z.string().email(),
});

// *******************   Form Submission functions **********************

export async function waitListUserFormSubmit(formData: FormData) {
  const validateFields = waitListUserSchema.safeParse({
    name: formData.get("name"),
    designation: formData.get("designation"),
    email: formData.get("email"),
  });


  // if form validation fails, return the error message
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing values. Failed to add to database.",
    };
  }

  // Prepare data to push to mongodb
  const { name, designation, email } = validateFields.data;

  try {
    const res = await fetch("http://localhost:3000/api/wait-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        designation,
        email,
      }),
    });

    // Get status of resposne
    const data = await res.json();

    if (data.success) {
      console.log("Successfully waitlist user added");
    } else {
      console.log(`Error: ${data.error}`);
      return {
        message: "DataBase Error: Failed to insert to database",
      };
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      message: "Server Error: Failed to insert to database",
    };
  }
}

// ******************************** Eamil sending section  ********************************

export async function SendEmail(emailParams: emailParams) {
  // call api
  const res = await fetch("api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailParams),
  });

  // check response
  const data = await res.json();
  if (data.success == true && res.status == 200) {
    console.log("Email sent sucessfully!");
  } else {
    console.log(`Failed, Error: ${data.message}`);
  }
}

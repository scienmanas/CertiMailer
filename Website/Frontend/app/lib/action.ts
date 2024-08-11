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


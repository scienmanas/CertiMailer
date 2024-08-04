import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailParams } from "@/app/lib/definitions";

export async function POST(request: Request) {
  const body: emailParams = (await request.json()) as emailParams;
  const { to, subject, text, toName = "", fromName } = body;

  // create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  // set up email data
  const mailOptions = {
    from: `${fromName} <${process.env.APP_EMAIL}>`,
    to: `${toName} <${to}>`,
    subject: subject,
    text: text,
  };

  // sending email
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        messsage: "Email sent sucessfuly",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error,
        success: false,
      },
      {
        status: 500, // Internal server error
      }
    );
  } finally {
    transporter.close();
  }
}

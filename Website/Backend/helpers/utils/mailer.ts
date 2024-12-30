import nodemailer from "nodemailer";
import multer from "multer";

const PORT: number = 465;

export async function sendMail({
  fromName = "",
  toName = "",
  toEmail,
  subject,
  message,
  file,
}: {
  fromName: string;
  toName?: string;
  toEmail: string;
  subject: string;
  message: string;
  file?: Express.Multer.File;
}): Promise<void> {
  const EMAIL = process.env.ADMIN_EMAIL;
  const PASSWORD = process.env.ADMIN_APP_PASSWORD;

  if (!EMAIL || !PASSWORD) {
    throw new Error(
      "Email credentials are not set in the environment variables."
    );
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.in",
    port: PORT,
    secure: true, // Use SSL
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  // Mail options
  const mailOptions: nodemailer.SendMailOptions = {
    from: `${fromName} <${EMAIL}>`,
    to: `${toName} <${toEmail}>`,
    replyTo: `Manas <manas@certimailer.xyz>`,
    subject: subject,
    text: message,
  };

  // Attach the file if present
  if (file) {
    mailOptions.attachments = [
      {
        filename: file.originalname,
        content: file.buffer,
        encoding: "base64",
      },
    ];
  }

  // Send the mail
  await transporter.sendMail(mailOptions);
}

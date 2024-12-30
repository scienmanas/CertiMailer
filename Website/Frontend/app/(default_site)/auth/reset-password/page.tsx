import type { Metadata } from "next";
import { ResetPassword } from "@/app/ui/auth/ResetPassword";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.DOMAIN as string),
  title: `Reset Password - ${process.env.SITE_NAME}`,
  description:
    "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
  keywords:
    "certificate, certificate generator, email certificates, verify certificates, CertiMailer, certification, automated mailing, digital certificates",
  robots: "index, follow",
  openGraph: {
    title: `Reset Password - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    url: `${process.env.DOMAIN}/auth/reset-password`,
    type: "website",
    locale: "en_US",
    siteName: "CertiMailer",
  },
  twitter: {
    card: "summary",
    title: `Reset Password - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    creator: "@scienmanas",
    site: `${process.env.DOMAIN}/auth/reset-password`,
  },
};

export default function ResetPasswordPage(): JSX.Element {
  return <ResetPassword />;
}

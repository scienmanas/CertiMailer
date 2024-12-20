import { Login } from "@/app/ui/auth/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.DOMAIN as string),
  title: `Login - ${process.env.SITE_NAME}`,
  description:
    "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
  keywords:
    "certificate, certificate generator, email certificates, verify certificates, CertiMailer, certification, automated mailing, digital certificates",
  robots: "index, follow",
  openGraph: {
    title: `Login - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    url: `${process.env.DOMAIN}/auth/login`,
    type: "website",
    locale: "en_US",
    siteName: "CertiMailer",
  },
  twitter: {
    card: "summary",
    title: `Login - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    creator: "@scienmanas",
    site: `${process.env.DOMAIN}/auth/login`,
  },
};

export default function RegisterPage(): JSX.Element {
  return <Login />;
}

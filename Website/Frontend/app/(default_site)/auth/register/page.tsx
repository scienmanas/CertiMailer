import { Register } from "@/app/ui/auth/Register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL as string),
  title: `Register - ${process.env.SITE_NAME}`,
  description:
    "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
  keywords:
    "certificate, certificate generator, email certificates, verify certificates, CertiMailer, certification, automated mailing, digital certificates",
  robots: "index, follow",
  openGraph: {
    title: `Register - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    url: `${process.env.SITE_URL}/auth/register`,
    type: "website",
    locale: "en_US",
    siteName: "CertiMailer",
  },
  twitter: {
    card: "summary",
    title: `Register - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    creator: "@scienmanas",
    site: `${process.env.SITE_URL}/auth/register`,
  },
};

export default function RegisterPage(): JSX.Element {
  return <Register />;
}

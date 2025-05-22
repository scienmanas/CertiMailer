import IdDetails from "@/app/ui/verify/IdDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL as string),
  title: `Verify - ${process.env.SITE_NAME}`,
  description:
    "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
  keywords:
    "certificate, certificate generator, email certificates, verify certificates, CertiMailer, certification, automated mailing, digital certificates",
  robots: "index, follow",
  openGraph: {
    title: `Verify - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    url: `${process.env.SITE_URL}/verify`,
    type: "website",
    locale: "en_US",
    siteName: "CertiMailer",
  },
  twitter: {
    card: "summary",
    title: `Verify - ${process.env.SITE_NAME}`,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    creator: "@scienmanas",
    site: `${process.env.SITE_URL}/verify`,
  },
};

export default function IdDetailsPage(): JSX.Element {
  return <IdDetails />;
}

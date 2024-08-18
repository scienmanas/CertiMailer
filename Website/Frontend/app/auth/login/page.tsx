import type { Metadata } from "next";
import { Inter } from "next/font/google";
import displayImage from "@/public/assets/view/display.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://certimailer.xyz"),
  title: "CertiMailer - Login",
  description:
    "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
  keywords:
    "certificate, certificate generator, email certificates, verify certificates, CertiMailer, certification, automated mailing, digital certificates",
  // authors: "CertiMailer Team",
  robots: "index, follow",
  openGraph: {
    title: "CertiMailer",
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    url: "https://www.certimailer.xyz", // replace with your actual domain
    type: "website",
    locale: "en_US",
    siteName: "CertiMailer",
    images: displayImage.src,
  },
  twitter: {
    card: "summary_large_image",
    title: "CertiMailer",
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
    // site: "@certimailer", // replace with your actual Twitter handle
    creator: "@ScientistManas", // replace with your actual Twitter handle
    images: displayImage.src,
  },
};






export default function Login():JSX.Element {
    return (
        <div>I am Login</div>
    )
}
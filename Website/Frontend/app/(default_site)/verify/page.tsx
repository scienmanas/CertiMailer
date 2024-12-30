import type { Metadata } from "next";
import { Verify } from "@/app/ui/verify/Verify";
import { Footer } from "@/app/ui/universal/Footer";
import { Navbar } from "@/app/ui/universal/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.DOMAIN as string),
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
    url: `${process.env.DOMAIN}/verify`,
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
    site: `${process.env.DOMAIN}/verify`,
  },
};

export default function VerifyPage(): JSX.Element {
  return (
    <section className="verify-page w-full h-fit flex items-center justify-center flex-col gap-6 sm:gap-10">
      <div className="navbar w-full h-fit">
        <Navbar />
      </div>
      <div className="verify w-full h-fit mt-8 p-4">
        <Verify />
      </div>
      <div className="footer w-full h-fit">
        <Footer />
      </div>
    </section>
  );
}

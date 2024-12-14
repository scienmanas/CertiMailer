import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import displayImage from "@/public/assets/view/display.png";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://certimailer.xyz"),
  title: "CertiMailer",
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
    creator: "@ScientistManas", // replace with your actual Twitter handle
    images: displayImage.src,
  },
};

export const viewport: Viewport = {
  themeColor: "pink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full h-fit antialiased dark:bg-[#151c25] bg-[#f2f2f2] scroll-smooth">
        {children}
      </body>
    </html>
  );
}

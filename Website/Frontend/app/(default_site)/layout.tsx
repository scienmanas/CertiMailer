import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import displayImage from "@/public/metadata/image.png";
<<<<<<< HEAD

const inter = Inter({ subsets: ["latin"] });
=======
>>>>>>> 9cad656 (Backend: Auth done)

export const metadata: Metadata = {
  metadataBase: new URL(process.env.DOMAIN as string),
  title: process.env.SITE_NAME,
  description:
    "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
  keywords:
    "certificate, certificate generator, email certificates, verify certificates, CertiMailer, certification, automated mailing, digital certificates",
  robots: "index, follow",
  openGraph: {
    title: process.env.SITE_NAME,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
<<<<<<< HEAD
    url: "https://www.certimailer.xyz",
=======
    url: process.env.DOMAIN,
>>>>>>> 9cad656 (Backend: Auth done)
    type: "website",
    locale: "en_US",
    siteName: "CertiMailer",
    images: displayImage.src,
  },
  twitter: {
    card: "summary",
    title: process.env.SITE_NAME,
    description:
      "A complete solution to generate, mail, and verify certificates. Streamline your certification process with ease.",
<<<<<<< HEAD
    creator: "@ScientistManas",
=======
    creator: "@scienmanas",
>>>>>>> 9cad656 (Backend: Auth done)
    images: displayImage.src,
    site: process.env.DOMAIN,
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/ui/landing/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CertiMailer | Home",
  description: "A complete solution to generate, mail and verify certificates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark w-full`}>
        <section className="dark:bg-[#1f2937] max-w-full flex items-center">
          <Navbar />
        </section>
        <section className="dark:bg-[#1f2937]">{children}</section>
      </body>
    </html>
  );
}

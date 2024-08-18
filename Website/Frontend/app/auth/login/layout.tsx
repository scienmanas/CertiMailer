import { Inter } from "next/font/google";
import { Navbar } from "../../ui/landing/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="dark:bg-[#151c25] max-w-full flex items-center">
      {/* <Navbar /> */}
      <section className="dark:bg-[#151c25]">{children}</section>
    </section>
  );
}

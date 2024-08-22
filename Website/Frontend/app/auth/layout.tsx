import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-white h-screen w-full">{children}</section>
  );
}

import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-dvh w-full bg-neutral-200">{children}</section>
  );
}

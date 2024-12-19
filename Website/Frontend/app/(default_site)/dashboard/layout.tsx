"use client";

import { Navbar } from "@/app/ui/dashboard/Navbar";
import { SideBar } from "@/app/ui/dashboard/SideBar";
import { TopLoader } from "@/app/ui/loaders";
import { PageLoader } from "@/app/ui/loaders";
import { Footer } from "@/app/ui/dashboard/Footer";
import { useEffect, useState, useRef } from "react";
import { validateCredentials } from "@/app/lib/controls/auth";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // UI Enhancements
  const router = useRouter();
  const [startTopLoader, setStartTopLoader] = useState<boolean>(true);
  const [Mounted, setMounted] = useState<boolean>(false);
  const hasMounted = useRef<boolean>(false);
  const { theme, setTheme } = useTheme();

  // Redirect when auth-token present logic
  useEffect(() => {
    const checkCredentials = async () => {
      const response = await validateCredentials();
      if (response.status !== 200) {
        router.push("/auth/login");
      } else if (response.status === 200) {
        router.push("/dashboard");
        setMounted(true);
        setStartTopLoader(false);
      }
    };

    checkCredentials();
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (theme === "system") {
        setTheme("light");
      } else if (theme === "dark" || theme === "light") {
        setTheme(theme);
      }
    }
  }, []);

  // Load page only if mouting is done
  if (!Mounted) return <PageLoader />;
  else
    return (
      <div className="flex flex-col w-full h-dvh bg-neutral-200 dark:bg-neutral-200">
        {startTopLoader && <TopLoader />}
        <div className="nav w-full h-fit">
          <Navbar />
        </div>
        <div className="side-nav-and-functionality flex flex-row h-full">
          <div className="side-nav h-full w-fit">
            <SideBar />
          </div>
          <div className="tab-conetnts w-full h-full">{children}</div>
        </div>
        <section className="footer">
          <Footer />
        </section>
      </div>
    );
}

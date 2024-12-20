"use client";

import { Navbar } from "@/app/ui/dashboard/Navbar";
import { SideBar } from "@/app/ui/dashboard/SideBar";
import { TopLoader } from "@/app/ui/loaders";
import { PageLoader } from "@/app/ui/loaders";
import { Footer } from "@/app/ui/dashboard/Footer";
import { useEffect, useState, useRef } from "react";
import { getUserData } from "@/app/lib/controls/user";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface userDataType {
  logoUrl: string;
}

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
  const [userLogoUrl, setUserLogoUrl] = useState<string | null>(null);

  // Redirect when auth-token present logic
  useEffect(() => {
    const checkCredentials = async () => {
      const response = await getUserData();
      if (response.status === 500) {
        // For internal server error
        router.push("/");
      } else if (response.status === 200) {
        // For successful response
        setUserLogoUrl(response.userData.logoUrl);
        setMounted(true);
        setStartTopLoader(false);
      } else {
        router.push("/auth/login");
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
      <div className="flex flex-col w-full h-dvh bg-neutral-200 dark:bg-neutral-200 pb-16 relative">
        {startTopLoader && <TopLoader />}
        <div className="nav w-full h-fit">
          <Navbar userLogoUrl={userLogoUrl as string} />
        </div>
        <div className="side-nav-and-functionality flex flex-row h-full">
          <div className="side-nav h-full w-fit">
            <SideBar />
          </div>
          <div className="tab-conetnts w-full h-full">{children}</div>
        </div>
        <section className="footer relative z-20">
          <Footer />
        </section>
      </div>
    );
}

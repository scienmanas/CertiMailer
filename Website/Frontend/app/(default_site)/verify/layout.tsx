"use client";

import "@/app/globals.css";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { PageLoader } from "@/app/ui/loaders";

export default function VerifyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Set the theme
  const hasMounted = useRef<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Set mounted state to true after the component has mounted
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      setMounted(true);
      if (theme === "system") {
        setTheme("light");
      } else if (theme === "dark" || theme === "light") {
        setTheme(theme);
      }
    }
  }, [theme, setTheme]);

  if (!mounted) return <PageLoader />;
  else return <section className="w-full h-fit">{children}</section>;
}

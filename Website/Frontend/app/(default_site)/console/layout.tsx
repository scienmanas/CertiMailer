"use client";

import { Navbar } from "@/app/ui/console/Navbar";
import { SideBar } from "@/app/ui/console/SideBar";
import { TopLoader } from "@/app/ui/components/top-loader";
import { Footer } from "@/app/ui/console/Footer";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // UI Enhancements
  const [startTopLoader, setStartTopLoader] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<null | string>(null);
  const [hoveredTab, setHoveredTab] = useState<null | string>(null);

  useEffect(() => {
    setStartTopLoader(false);
  }, []);

  return (
    <div className="flex flex-col w-full h-dvh bg-neutral-200">
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

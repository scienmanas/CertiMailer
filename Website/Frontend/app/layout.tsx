import "./globals.css";
import { Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider attribute="class">
          {children}
          <GoogleAnalytics
            gaId={process.env.G_ANALYTICS_ID as string}
            debugMode={false}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

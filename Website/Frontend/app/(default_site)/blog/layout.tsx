import { Metadata } from "next"; // Import the Metadata type from Next.js
import { Navbar } from "@/app/ui/universal/Navbar";
import { Footer } from "@/app/ui/universal/Footer";

// Generate the metadata for the blogs page
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.DOMAIN as string),
    title: `Blogs - ${process.env.SITE_NAME}`,
    description: "Read the blogs, discover phenomenal things happening around",
    keywords: ["reading", "article", "tech", "knowledge"],
    robots: "index, follow",
    openGraph: {
      title: `Blogs - ${process.env.SITE_NAME}`,
      description: "Read the blogs from core team of CertiMailer.",
      url: `${process.env.DOMAIN}/blog`,
      type: "article",
      siteName: `${process.env.SITE_NAME}`,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: `Blogs - ${process.env.SITE_NAME}`,
      description: "Read the blogs from core team of CertiMailer.",
      creator: "@scienmanas",
      site: `${process.env.DOMAIN}/blog`,
    },
  };
}

// Layout component that wraps the blog page contents
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page-contents relative w-full h-fit flex flex-col items-center justify-center  gap-10">
      <div className="navbar w-full h-fit">
        <Navbar />
      </div>
      <main className="relative w-full h-fit flex flex-col items-center justify-center px-2 py-4">
        {children}
      </main>
      <div className="footer w-full h-fit">
        <Footer />
      </div>
    </div>
  );
}

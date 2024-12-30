import { Navbar } from "@/app/ui/universal/Navbar";
import { Footer } from "@/app/ui/universal/Footer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageURL = process.env.DOMAIN + `generate`;

  return {
    metadataBase: new URL(process.env.DOMAIN as string),
    title: "Generate | CertiMailer",
    description:
      "Generate id/certificate in bulk with no restriction on the number of id/certificate generated.",
    keywords: [" generate", "certimailer", "certificate", "id"],
    robots: "index, follow",
    openGraph: {
      title: "Generate | CertiMailer",
      description:
        "Generate id/certificate in bulk with no restriction on the number of id/certificate generated.",
      url: pageURL,
      type: "website",
      siteName: `${process.env.SITE_NAME}`,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: "Generate | CertiMailer",
      description:
        "Generate id/certificate in bulk with no restriction on the number of id/certificate generated.",
      creator: "@scienmanas",
      site: pageURL,
    },
  };
}

// Layout component that wraps the blog page contents
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page-contents relative w-full h-fit flex flex-col items-center justify-center gap-6">
      <Navbar />
      <main className="w-full h-fit flex flex-col items-center justify-center p-4 mt-14">
        {children}
      </main>
      <Footer />
    </div>
  );
}

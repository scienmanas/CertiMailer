import { Navbar } from "@/app/ui/universal/Navbar";
import { Footer } from "@/app/ui/universal/Footer";
import { firaSansFont } from "@/app/utils/fonts";
import { Metadata } from "next";
import Link from "next/link";

// Generate the metadata for the Auth page
export async function generateMetadata(): Promise<Metadata> {
  const pageURL = process.env.DOMAIN + `auth`;

  return {
    metadataBase: new URL(process.env.DOMAIN as string),
    title: "Options | CertiMailer",
    description:
      "Choose an options and start automating your certificate/id delivery process.",
    keywords: [" options", "certimailer", "certificate", "id"],
    robots: "index, follow",
    openGraph: {
      title: "Options | CertiMailer",
      description:
        "Choose an options and start automating your certificate/id delivery process.",
      url: pageURL,
      type: "website",
      siteName: `${process.env.SITE_NAME}`,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: "Options | CertiMailer",
      description:
        "Choose an options and start automating your certificate/id delivery process.",
      creator: "@scienmanas",
      site: pageURL,
    },
  };
}

export default function Auth(): JSX.Element {
  return (
    <section
      className={`options w-full flex items-center justify-center flex-col ${firaSansFont.className} gap-6 sm:gap-10`}
    >
      <Navbar />
      <div className="content-wrapper w-full max-w-screen-2xl h-fit flex flex-col items-start justify-center p-4 mt-14 gap-6">
        <div className="heading font-semibold text-2xl sm:text-3xl md:text-4xl underline text-black dark:text-white">
          Options
        </div>
        <div className="description-and-content text-sm sm:text-base w-fit h-fit">
          <p className="w-fit h-fit text-gray-800 dark:text-gray-200">
            In this web-app, you can choose unlimited id/certificate generation
            with no generation of unique id for it or you can choose to generate
            unique id for each id/certificate generated for a limited amount.
          </p>
          <br />
          <p className="w-fit h-fit text-gray-800 dark:text-gray-200 underline">
            Below are the options given to you.
          </p>
        </div>
        <div className="cards flex flex-col gap-4 w-fit h-fit">
          <Link href={"/generate"}>
            <div className="card max-w-[450px] w-fit h-fit flex items-center justify-center gap-4 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
              <div className="card-content w-full h-fit flex flex-col items-start justify-center gap-2">
                <div className="card-heading font-semibold text-lg sm:text-xl md:text-2xl underline text-black dark:text-white">
                  Unlimited Generation
                </div>
                <div className="card-description text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  Choose this option to generate id/certificate without unique
                  id generation.
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/auth/login"}>
            <div className="card max-w-[450px] w-fit h-fit flex items-center justify-center gap-4 p-4 bg-yellow-300 dark:bg-yellow-800 rounded-lg">
              <div className="card-content w-full h-fit flex flex-col items-start justify-center gap-2">
                <div className="card-heading font-semibold text-lg sm:text-xl md:text-2xl underline text-black dark:text-white">
                  Limited Generation
                </div>
                <div className="card-description text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  Choose this option to generate id/certificate with unique id
                  generation.
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}

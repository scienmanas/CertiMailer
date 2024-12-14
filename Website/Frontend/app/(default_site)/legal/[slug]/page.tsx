import { Metadata } from "next";
import Markdown from "markdown-to-jsx";
import { markdownParser } from "@/app/utils/markdown-parser";
import { firaSansFont } from "@/app/utils/fonts";

type PageProps = {
  params: { slug: string };
};

function getMarkDownData(slug: string) {
  const data = markdownParser("legal", slug);
  return data;
}

// Generate the metadata for the blogs page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pageURL = process.env.DOMAIN + `/legal/${params.slug}`;
  const data = getMarkDownData(params.slug);

  return {
    metadataBase: new URL(process.env.DOMAIN as string),
    title: `${data.metaData.title} - ${process.env.SITE_NAME}`,
    description: data.metaData.description,
    keywords: data.metaData.keywords,
    robots: "index, follow",
    openGraph: {
      title: `${data.metaData.title} - ${process.env.SITE_NAME}`,
      description: data.metaData.description,
      url: pageURL,
      type: "article",
      siteName: `${process.env.SITE_NAME}`,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: `${data.metaData.title} - ${process.env.SITE_NAME}`,
      description: data.metaData.description,
      creator: "@scienmanas",
      site: pageURL,
    },
  };
}

export default function PrivacyPolicy({ params }: PageProps): JSX.Element {
  const data = markdownParser("legal", params.slug);

  return (
    <section
      className={`w-full h-fit flex items-center justify-center ${firaSansFont.className}`}
    >
      <div className="wrapper w-full max-w-screen-2xl h-fit flex items-center justify-center">
        <div className="content w-full h-fit flex flex-col gap-6 items-start">
          <div className="heading font-semibold text-2xl sm:text-3xl md:text-4xl underline">
            {data.heading}
          </div>
          <div className="content text-base text-neutral-700 dark:text-neutral-300 sm:text-lg markdown">
            <Markdown>{data.content}</Markdown>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}

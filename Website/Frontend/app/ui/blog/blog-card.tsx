import { BsCalendar2Date } from "react-icons/bs";
import { formatDate } from "@/app/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import { BlogPostMetaDataProps } from "@/app/lib/definitions";

// Component to display a blog card with image, metadata, and tags
export function BlogCard({ cardData }: BlogPostMetaDataProps): JSX.Element {
  return (
    <div className="relative blog-card flex flex-row flex-wrap items-start justify-center w-fit gap-6">
      <div className="relative image-container w-fit h-fit rounded-md group overflow-hidden">
        <Link
          href={`/blog/${cardData.slug}`}
          className="w-fit h-fit rounded-md group"
        >
          <Image
            alt="blog-img"
            src={cardData.image}
            width={448}
            height={272}
            className="rounded-md w-[448px] h-[272px] object-cover duration-200 transform group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="relative metadata flex flex-col items-start gap-4 max-w-[419px] text-wrap w-fit h-full">
        <div className="heading-publisheddate-readingtime w-fit h-fit flex flex-col gap-2">
          <div className="publish-date flex flex-row gap-2 items-center w-fit h-fit">
            <BsCalendar2Date className="text-base text-neutral-800 dark:text-neutral-200" />
            <span className="text-sm sm:text-base font-semibold text-neutral-600 dark:text-neutral-400">
              {formatDate(cardData.publishedDate)}{" "}
            </span>
          </div>
          <div className="title-and-description flex flex-col text-wrap gap-1 w-fit h-fit">
            <Link href={`/blog/${cardData.slug}`}>
              <div className="title font-bold text-neutral-800 dark:text-neutral-200 text-xl sm:text-2xl duration-200 hover:text-purple-700 dark:hover:text-purple-300">
                {cardData.title}
              </div>
            </Link>
            <div className="description text-neutral-700 dark:text-neutral-400">
              {cardData.description}
            </div>
          </div>
        </div>

        <div className="tags w-full flex items-start justify-start flex-row flex-wrap h-fit gap-2">
          {cardData.tags.map((tag: string, index: number) => (
            <div
              key={index}
              className="tag text-xs sm:text-sm px-2 py-1 bg-neutral-300 text-neutral-800 dark:bg-neutral-600 dark:text-neutral-200 rounded-sm"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

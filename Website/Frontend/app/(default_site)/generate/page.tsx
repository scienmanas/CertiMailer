"use client";

import Link from "next/link";
import { Generate } from "@/app/ui/generate/Generate";

export default function GeneratePage(): JSX.Element {
  return (
    <section className="w-full h-fit flex items-center justify-center p-2">
      <div className="wrapper w-full max-w-screen-2xl h-fit">
        <div className="content-wrapper w-full max-w-screen-2xl h-fit flex flex-col items-start justify-center gap-6">
          <div className="heading font-semibold text-2xl sm:text-3xl md:text-4xl underline text-black dark:text-white">
            Generate
          </div>
          <div className="description-and-content text-sm sm:text-base w-fit h-fit flex flex-col gap-4">
            <p className="w-fit h-fit text-gray-800 dark:text-gray-200">
              In this page you can generate the certificate or id in bulk but
              they won't have any id and no data will be stored in the server.
              Please don't refresh as the data will be lost. Being a free
              service, the data will be lost after the page is refreshed. That
              being said, let's begin.
            </p>
            <p className="w-fit h-fit text-gray-800 dark:text-gray-200">
              If you encounter any issues apart from refrsh thing feel free to
              contact me directly at{" "}
              <Link href={`mailto:manas@certimailer.xyz`}>
                <span className="underline text-blue-800 dark:text-blue-400 font-semibold">
                  manas@certimailer.xyz
                </span>
              </Link>
              . Your feedback is valuable, and I am here to assist you with any
              queries you might have.
            </p>
          </div>
          <div className="generation function flex  w-full h-fit">
            <Generate />
          </div>
        </div>
      </div>
    </section>
  );
}

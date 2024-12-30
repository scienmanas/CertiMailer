"use client";

import { Generate } from "@/app/ui/dashboard/generate/Generate";
import { firaSansFont } from "@/app/utils/fonts";

export default function Generare(): JSX.Element {
  return (
    <section className={`generate-section py-5 px-4 ${firaSansFont.className}`}>
      <div className="generate-section__content w-fit h-fit flex flex-col gap-4">
        <h1 className="generate-section__title text-lg sm:text-xl font-bold underline text-black dark:text-neutral-200">
          Generate the ids(s)/certificate(s)
        </h1>
        <p className="generate-section__description text-neutral-700 text-sm sm:text-base dark:text-neutral-400">
          There are aboviusly some limitations which you can see in the
          dashboard, but you can mail me to increase it.
        </p>
        <div className="generate-tab w-fit h-fit overflow-scroll">
          <Generate />
        </div>
      </div>
    </section>
  );
}

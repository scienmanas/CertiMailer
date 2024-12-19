"use client";

import { UploadId } from "@/app/ui/components/upload-id";
import { Fragment } from "react";
import Image from "next/image";
import surprisedGig from "@/public/assets/universal/surprised-cockroach.gif";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Generare(): JSX.Element {
  return (
    <Fragment>
      <section className="hidden md:flex generate-tab p-4 w-full h-full">
        <div className="z-40 absolute uplaod-id w-full h-full inset-0">
          <UploadId />
        </div>
      </section>
      <section className="md:hidden p-4 w-full h-full flex flex-col">
        <div className="content-holder-small-screen w-full h-fit flex flex-col items-center justify-center gap-4">
          <div className="image w-fit h-fit">
            <Image
              src={surprisedGig}
              alt="surpised-gig"
              className="rounded-lg border-2 border-pink-500 w-fit h-fit"
            />
          </div>
          <div className="line w-full h-fit">
            <hr className="border-gray-300 border-t w-full" />
          </div>
          <div className="text-content w-full h-fit flex flex-col items-center justify-center gap-2">
            <h1 className="w-fit h-fit font-bold text-sm sm:text-lg">
              I know you are super intelligent 😭
            </h1>
            <div className="further-text flex flex-col gap-1">
              <p className="w-full h-fit text-sm sm:text-base">
                <span>😅 But you are on a </span>
                <span className="font-semibold underline ">
                  small screen📱!{" "}
                </span>
                <span>Try a </span>
                <span className="font-semibold underline">tablet or PC </span>
                <span>instead! 🖥️😉 </span>
              </p>
              <div className="star-repo-please w-full h-fit flex items-center text-sm sm:text-base">
                Also, give a star to the repo 😅 :{" "}
                <span className="w-fit h-fit">
                  <Link href={"https://github.com/scienmanas/CertiMailer"}>
                    <FaGithub />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

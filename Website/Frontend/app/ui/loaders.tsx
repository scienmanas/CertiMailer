"use client";

import { submissionLoaderProps } from "@/app/lib/definitions";
import Image from "next/image";
import logoImg from "@/public/assets/logo/logo.png";
import Link from "next/link";

// Submission loader
export function SubmissionLoader({
  width,
  height,
  color,
}: submissionLoaderProps): JSX.Element {
  return (
    <div className="flex justify-center items-center w-fit h-fit">
      <div
        style={{
          width: width,
          height: height,
          borderColor: color,
        }}
        className="animate-spin rounded-full border-b-2 "
      ></div>
    </div>
  );
}

// Top loader
export function TopLoader(): JSX.Element {
  return (
    <section className="top-load-bar absolute w-full z-50">
      <div className="load-bar">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </section>
  );
}

export function PageLoader(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center w-dvw h-dvh ">
      <TopLoader />
      <div className="relative flex flex-col items-center justify-center gap-2">
        <div className="relative w-fit h-fit">
          <Image
            src={logoImg}
            alt="Website Logo"
            width={100}
            height={100}
            className=""
          />
        </div>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 font-mono">
          Just a moment<span className="animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
}

export function IdNotFound(): JSX.Element {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <div className="content-wrapper w-fit h-fit flex flex-col items-center max-w-[448px] text-wrap gap-4 p-4">
        {/* Display the 404 error code */}
        <div className="error-code w-fit h-fit text-center text-wrap font-extrabold text-6xl sm:text-8xl dark:text-purple-500 text-purple-700 animate-pulse">
          404
        </div>
        <div className="regrets-and-console-text w-fit h-fit flex flex-col items-center justify-center gap-2">
          {/* Regret message for the missing page */}
          <div className="regret-text w-fit h-fit text-center text-wrap font-bold text-neutral-800 dark:text-neutral-200 text-2xl">
            Sorry 😔, I couldn't the requested id/certificate.
          </div>
          {/* Suggestion to visit the homepage */}
          <div className="console-person w-fit h-fit text-center text-wrap text-neutral-600 dark:text-neutral-400">
            But don't worry, you can find plenty of other things on my homepage.
          </div>
        </div>
        {/* Button to navigate back to the homepage */}
        <Link href={"/"} className="w-fit h-fit mt-4">
          <button className="return-to-home w-fit h-fit px-5 py-4 rounded-[30px] bg-transparent dark:bg-transparent text-neutral-700 border border-[#9ea5b0] hover:bg-neutral-200 hover:border-neutral-600 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:text-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 duration-300">
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}

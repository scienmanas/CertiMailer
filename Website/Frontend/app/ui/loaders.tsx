"use client";

import { submissionLoaderProps } from "@/app/lib/definitions";
import Image from "next/image";
import logoImg from "@/public/assets/logo/logo.png";

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

export function FetchDataLoader(): JSX.Element {
  return (
    <div className="flex justify-center items-center w-fit h-fit">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-pink-300"></div>
    </div>
  );
}

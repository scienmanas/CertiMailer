'use client'

import Link from "next/link";
import Image from "next/image";
import { BiLinkExternal } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import hero from "@/public/assets/hero/hero.png";
import { FlipWords } from "@/app/ui/components/flip-words";

export function Hero(): JSX.Element {
  const heroHeadWords = [
    "Mailing.",
    "Verificaion.",
    "Authenticity.",
    "Automation.",
  ];

  return (
    <div className="hero w-full flex items-center justify-center relative md:mt-0 mt-12">
      <div className="hero-content max-w-screen-2xl flex sm:flex-row flex-col p-8 relative items-center justify-between">
        <div className="hero-text sm:w-[60%] gap-5 flex flex-col">
          <div className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-fit">
            <div className="w-fit h-[4rem] sm:h-[5rem] py-5">
              <span className="dark:text-white text-neutral-900">Be it</span>
              <FlipWords
                words={heroHeadWords}
                className="font-extrabold dark:text-green-300 text-green-700"
              />
            </div>
            <div className="w-fit">
              <span className="text-neutral-900 dark:text-white">Our system supports </span>
              <span className="dark:text-yellow-400 text-orange-700 font-semibold underline">
                Everything.{" "}
              </span>
            </div>
          </div>
          <div className="hero-description text-base sm:text-lg md:text-xl lg:text-2xl w-fit max-w-[95%] dark:text-neutral-200 text-neutral-800 font-semibold">
            We have automated everything you require for your organization.
          </div>
          <div className="redirect-buttons flex gap-6 flex-row items-center">
            <Link
              href="#"
              className="get-started bg-transparent bg-gradient-to-bl from-[#9b48e8] to-[#9d7af9] flex flex-row items-center gap-2 px-3 py-3 sm:gap-2 sm:px-5 sm:py-4 rounded-3xl font-semibold group"
            >
              <span className="text-white">Get started</span>
              <FaArrowRight className="group-hover:translate-x-1 duration-200 text-white" />
            </Link>
            <Link href="#" className="github flex flex-row gap-2 items-center">
              <span className="dark:text-white text-neutral-900 font-bold">
                Github
              </span>
              <BiLinkExternal className="text-xl dark:text-white text-neutral-900" />
            </Link>
          </div>
        </div>
        <div className="hero-image w-[35%] hidden sm:flex relative">
          <Image alt="hero_img" src={hero} className="w-auto h-auto" />
          <p className="absolute select-none -bottom-5 text-xs px-3 py-1 border-[1px] rounded-2xl dark:border-purple-400 border-purple-800 dark:text-white text-neutral-800">
            {" "}
            Powered by DALL-E 3
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { BsStars } from "react-icons/bs";
import Image from "next/image";
import whistle from "@/public/assets/universal/whistle.png";
import hat from "@/public/assets/universal/hat.png";
import clock from "@/public/assets/universal/clock.png";
import compass from "@/public/assets/universal/compass.png";
import clsx from "clsx";
import { CardProps } from "@/app/lib/definitions";
import { FaLongArrowAltRight } from "react-icons/fa";
import { firaSansFont } from "@/app/utils/fonts";

export function Features(): JSX.Element {
  const cards = [
    {
      svg: whistle,
      alt: "whistle",
      head: "Open Source",
      description:
        "An completely open source tool to manage your certification tasks, with no hidden charges.",
      className: "bg-[#ebebee] dark:bg-gray-700",
    },
    {
      svg: hat,
      alt: "hat",
      head: "Geneartion, Mailaing & verification",
      description:
        "Generate organization with a valid organization domain or show a proof of your oraganization, That's enough. We will take care of the rest.",
      className: "bg-[#ebebee] dark:bg-gray-700",
    },
    {
      svg: clock,
      alt: "clock",
      head: "Time Saving",
      description:
        "Few clicks and you are ready to go. The storage is on us no worries initially.",
      className: "bg-[#ebebee] dark:bg-gray-700",
    },
    {
      svg: compass,
      alt: "compass",
      head: "User Friendly",
      description:
        "Are you a school teacher, club head, or a community manager, few clicks and you are there.",
      className: "bg-transparent dark:hover:bg-gray-700 hover:bg-[#ebebee]",
    },
  ];

  return (
    <div className={`features w-full flex items-center relative justify-center ${firaSansFont.className}`}>
      <div className="features-content w-screen max-w-screen-2xl flex p-7 relative flex-col gap-10 lg:gap-14">
        <div className="svg w-fit h-fit p-5">
          <BsStars className="dark:text-purple-400 text-purple-700 text-5xl" />
        </div>
        <div className="relative contents-all w-full flex flex-col gap-10 z-10">
          <div className="head-and-description flex flex-col gap-4 p-5">
            <div className="heading-text text-xl font-bold text-neutral-800 to dark:text-neutral-200 h-fit max-w-[29rem] sm:text-2xl ">
              A fully open-source tool to automate and manage your certificate
              generation task.
            </div>
            <div className="description dark:text-slate-300 text-neutral-800 h-fit max-w-[30rem]">
              Manage everything related to certification, with just some simple
              clicks, upload the csv or excel file with the given instruction,
              choose templates and with few clicks completely free!
            </div>
          </div>
          <div className="card-container w-full flex items-center justify-center">
            <div className="cards rounded-3xl border-2 dark:border-[#434959] border-pink-800 overflow-clip w-fit h-fit grid md:grid-cols-2 2xl:grid-cols-4">
              {cards.map((card, index) => {
                return <Card card={card} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ card }: CardProps): JSX.Element => {
  return (
    <div
      className={clsx(
        "card group border-[1px] dark:border-[#434959] border-neutral-300 w-fit p-7 flex flex-col gap-7 justify-between",
        card.className
      )}
    >
      <div className="card-contnet flex flex-col gap-7">
        <div className="svg">
          <Image alt={card.alt} src={card.svg} width={40} />
        </div>
        <div className="head-test duration-150 dark:text-white text-neutral-700 dark:group-hover:text-[#9a73f7] group-hover:text-purple-800 font-bold w-[15rem] sm:text-xl sm:w-[18.5rem] text-wrap">
          {card.head}
        </div>
        <div className="description w-[15rem] sm:w-[18.5rem] dark:text-white text-neutral-800">
          {card.description}
        </div>
      </div>
      <div className="arrow-animated-readme-more flex flex-row justify-between items-center">
        <p className="w-fit h-fit cursor-pointer dark:border-blue-400 border-pink-800 border-[1px] rounded-2xl py-1 px-2 dark:group-hover:text-yellow-200 group-hover:text-amber-800 dark:text-white text-neutral-800">
          Read more
        </p>
        <FaLongArrowAltRight className="invisible group-hover:visible group-hover:translate-x-3 duration-200 group-hover:text-violet-400 text-violet-400" />
      </div>
    </div>
  );
};

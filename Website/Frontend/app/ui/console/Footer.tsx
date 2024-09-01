"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

export function Footer(): JSX.Element {
  const [formattedDate, setFormattedDate] = useState<string>("Loading...");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "short",
      };

      const timeNow = new Date();
      const dateStr = Intl.DateTimeFormat("en-US", options).format(timeNow);
      setFormattedDate(dateStr);
    };

    updateTime(); // Update immediately on mount
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <footer className="w-full h-fit bg-[#403939] flex flex-row justify-between py-2 px-2 items-center">
      <div className="text-white sm:text-sm text-[10px] flex flex-col">
        <span>
          &copy; 2024 |{" "}
          <span className="text-purple-300 hover:underline">
            <Link href={"/"}>CertiMailer</Link>
          </span>{" "}
          · All rights reserved
        </span>
        <span>
          Made by{" "}
          <span className="text-cyan-300 hover:underline">
            <Link href={"https://github.com/scienmanas"}>Manas</Link>
          </span>{" "}
          with 💖.
        </span>
      </div>
      <div className="links w-fit h-fit flex flex-col items-center">
        <ul className="w-fit h-fit flex gap-1 items-center">
          <Link href={"/"} className="p-[2px] ">
            <li>
              <FiGithub className="text-xs sm:text-base text-neutral-400 hover:text-neutral-200 duration-200" />
            </li>
          </Link>
          <Link href={"/"} className="p-[2px] ">
            <li>
              <FaXTwitter className="text-xs sm:text-base text-neutral-400 hover:text-neutral-200 duration-200" />
            </li>
          </Link>
          <Link href={"/"} className="p-[2px] ">
            <li>
              <MdOutlineEmail className="text-sm sm:text-lg text-neutral-400 hover:text-blue-400 duration-200 " />
            </li>
          </Link>
          <Link href={"/"} className="p-[2px] ">
            <li>
              <FaYoutube className="text-sm sm:text-lg text-neutral-400 hover:text-red-500 duration-200" />
            </li>
          </Link>
          <Link href={"/"} className="p-[2px] ">
            <li>
              <FaDiscord className="text-sm sm:text-lg text-neutral-400 hover:text-[#5865f2] duration-200" />
            </li>
          </Link>
          <Link href={"/"} className="p-[2px]">
            <li>
              <FaTelegramPlane className="text-sm sm:text-base text-neutral-400 hover:text-[#25a3e1] hover:duration-200" />
            </li>
          </Link>
        </ul>
        <div className="latest-time text-green-500 text-[8px] sm:text-xs w-36 sm:w-fit">
          ({formattedDate})
        </div>
      </div>
    </footer>
  );
}

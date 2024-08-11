"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo/logo_full_no_bg.png";
import { IoLanguage } from "react-icons/io5";
import { useState, useEffect, use } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiGithub } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export function Navbar(): JSX.Element {
  const [languageCode, setLanguageCode] = useState("EN");

  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      // document.body.classList.add("dark");
    } else if (theme === "light") {
      // document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav
      className={`flex items-center w-full fixed top-0 md:relative justify-center blurred-navbar z-20 rounded-md shadow-xl
        ${isScrolled ? "border-b-[1px] border-[#1f2c47]" : ""}
        `}
    >
      <div className="relative navbar w-screen max-w-screen-2xl py-3 px-6 flex justify-between items-center">
        <div className="left-logo">
          <Link href={`/`}>
            <div className="logo">
              <Image
                className=""
                src={logo}
                alt="logo"
                width={70}
                height={70}
              />
            </div>
          </Link>
        </div>
        <div className="right-items-navbar-contents">
          <button
            className="hamburger flex md:hidden flex-col gap-y-[8px]"
            onClick={() => {
              setIsHamburgerOpened(() => !isHamburgerOpened);
            }}
          >
            <div
              className={`lines h-[2px] w-5 dark:bg-slate-100 bg-neutral-800 transition transform duration-200 
              ${
                isHamburgerOpened
                  ? "rotate-45 translate-y-[6px]"
                  : "rotate-0 translate-y-0"
              }`}
            ></div>
            <div
              className={`lines h-[2px] w-5 dark:bg-slate-100 bg-neutral-800 transition transform duration-200 
              ${
                isHamburgerOpened
                  ? "-rotate-45 -translate-y-[6px]"
                  : "rotate-0 translate-y-0"
              }`}
            ></div>
          </button>
          <div
            className={`navbar-options absolute w-screen md:relative md:flex md:flex-row z-30 md:w-fit md:p-0 md:top-0
              ${
                isHamburgerOpened
                  ? "top-[3.2rem] h-fit left-0 px-4 py-2"
                  : "hidden"
              }`}
          >
            <div className="navbar-buttons flex flex-col md:flex-row w-full gap-4 dark:bg-[#293041] bg-[#2a4079] dark:md:bg-transparent dark:border-[#4445a3] border-yellow-400 border-[2px] md:bg-transparent md:border-none rounded-lg p-4 md:items-center">
              <ul className="flex flex-col md:flex-row gap-4 items-start md:items-center w-fit">
                <li className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-400 hover:text-gray-100 sm:text-gray-600 sm:hover:text-black font-semibold cursor-pointer duration-150">
                  <Link href="#">Overview</Link>
                </li>
                <li className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-400 hover:text-gray-100 sm:text-gray-600 sm:hover:text-black font-semibold cursor-pointer duration-150">
                  {/* <Link href="#">Solutions</Link> */}
                  <Link href="/verify">Verify</Link>
                </li>
                <li className="dark:text-gray-400 dark:hover:text-gray-100 text-gray-400 hover:text-gray-100 sm:text-gray-600 sm:hover:text-black font-semibold cursor-pointer duration-150">
                  <Link href="#">Blog</Link>
                </li>
                <Link
                  href="https://github.com/scienmanas/CertiMailer"
                  className="p-1 focus:outline-1 focus:outline-purple-400 transition duration-200 rounded-lg focus:outline-dashed dark:text-purple-200 dark:hover:text-purple-400 md:text-gray-800 md:hover:text-black text-purple-200 hover:text-purple-400 hover:scale-110 active:scale-95"
                >
                  <li className="github text-lg w-fit h-fit">
                    <FiGithub className="text-xl " />
                  </li>
                </Link>
                <li className="mode flex items-center justify-center w-fit h-fit">
                  <button
                    onClick={() => {
                      console.log(`Previos Theme: ${theme}`);
                      if (theme == "dark") {
                        setTheme("light");
                      } else {
                        setTheme("dark");
                      }
                      console.log(`New Theme: ${theme}`);
                    }}
                    className="mode-app w-fit h-fit p-1 focus:outline-1 focus:outline-purple-400 transition duration-200 rounded-lg focus:outline-dashed dark:text-purple-200 dark:hover:text-purple-400 text-purple-200 hover:text-purple-400 md:text-gray-800 md:hover:text-black hover:scale-110 active:scale-95"
                  >
                    {theme == "dark" ? (
                      <MdOutlineDarkMode className="text-xl" />
                    ) : (
                      <MdOutlineLightMode className="text-xl" />
                    )}
                  </button>
                </li>
              </ul>
              <ul className="buttons-lan-git flex flex-row items-center gap-4  md:flex-row justify-between md:items-center w-full md:w-fit">
                <Link href="/auth">
                  <li className="sign-up-button bg-transparent bg-gradient-to-tr from-[#7e3eee] to-[#a587fa] px-4 py-2 rounded-lg font-bold shadow-2xl shadow-white duration-150 hover:from-[#6a34c8] hover:to-[#a388ef]">
                    <span className="text-white">Sign in</span>
                  </li>
                </Link>
                <li>
                  <button className="group flex items-center flex-row gap-1 dark:text-white md:text-black text-white">
                    <IoLanguage />
                    <span>{languageCode}</span>
                    <IoIosArrowDown />
                  </button>
                  <div className="languages">
                    <div className="drop-down-languages">
                      <ul>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

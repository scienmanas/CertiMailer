"use client";

import Link from "next/link";
import Image from "next/image";
import { GlowingButton } from "@/app/ui/buttons";
import { FaInstagram } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { JSX } from "react/jsx-runtime";
import logo from "@/public/assets/logo/logo_nobg.png";
import { useState } from "react";
import { BackgroundBeams } from "@/app/ui/animations/background-beams";
import { NewsLetterSubmitLoader } from "@/app/ui/loaders";

export function Footer(): JSX.Element {
  const buttonText = "Want to contribute/contact ?";

  const [isEmail, setIsEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const submitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent reloading of the page and start the loader
    e.preventDefault();
    setSubmitted(() => true);

    // API URI
    const DATA_API = "https://certimailer.onrender.com/api/user/newsletter-insert-user";
    const EMAIL_API = "https://certimailer.onrender.com/api/send-email/admin";

    // const DATA_API = "http://localhost:5000/api/user/newsletter-insert-user";
    // const EMAIL_API = "http://localhost:5000/api/send-email/admin";

    // Get the form data
    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;

    try {
      await fetch(DATA_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to subscribe to newsletter.");
    }

    // Reset the form and stop the loader and show the success message
    setSubmitted(() => false);
    setSubscribed(() => true);

    // To reset the form after submission
    setIsEmail(() => false);

    // Sned the email after all things is done
    const emailData = {
      fromName: "Manas",
      toName: "",
      toEmail: email,
      subject: "Subscribed to CertiMailer Newsletter ! !",
      message: `You have sucessfully subscribed to CertiMailer with ${email}. From now you will be receiving the news about updates, blogs, and much more.\n\nBest Regards,\nTeam CertiMailer\n(Open Source)\n\n(This is an automated generated mail which will be not monitored.)`,
    };

    try {
      await fetch(EMAIL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="relative bg-transparent bg-gradient-to-tr from-black to-[#28243d] w-full flex justify-center">
      <div className="footer-element my-10 relative p-8 w-screen max-w-screen-xl">
        <div className="footer-contents relative z-10 flex flex-col gap-y-16">
          <div className="set-1 flex flex-row flex-wrap justify-between gap-10">
            <div className="left flex flex-col gap-4">
              <div className="head-text text-white font-semibold max-w-64">
                Automating certificate mailing and verfication.
              </div>
              <GlowingButton text={buttonText} />
            </div>
            <div className="right flex flex-row flex-wrap gap-9 h-fit w-fit">
              <div className="resources w-fit h-fit text-sm sm:text-base">
                <ul className="flex flex-col gap-1">
                  <h3 className="font-semibold text-white">Resources</h3>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Post
                  </li>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Docs
                  </li>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Github
                  </li>
                </ul>
              </div>
              <div className="project w-fit h-fit text-sm sm:text-base">
                <ul className="flex flex-col gap-1">
                  <h3 className="font-semibold text-white">Project</h3>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Github
                  </li>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Contribute
                  </li>
                </ul>
              </div>
              <div className="legal w-fit h-fit text-sm sm:text-base">
                <ul className="flex flex-col gap-1">
                  <h3 className="font-semibold text-white">Legal</h3>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Term and conditions
                  </li>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Privacy Policy
                  </li>
                </ul>
              </div>
              <div className="products w-fit h-fit text-sm sm:text-base">
                <ul className="flex flex-col gap-1">
                  <h3 className="font-semibold text-white">Products</h3>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    API
                  </li>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Github
                  </li>
                  <li className="text-gray-400 hover:text-gray-200 duration-100 cursor-pointer">
                    Docs
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="set-2 flex justify-between gap-9 flex-wrap">
            <div className="left flex flex-col gap-4">
              <div className="logo">
                <Image
                  src={logo}
                  width={100}
                  height={100}
                  alt="Logo"
                  loading="lazy"
                />
              </div>
              <div className="copyright text-sm">
                <span className="text-white">&#169; 2024 | Made by Manas </span>
              </div>
            </div>
            <div className="right flex flex-col flex-wrap gap-5">
              <form
                onSubmit={submitEmail}
                className="ubscribe flex flex-row gap-3 flex-wrap"
              >
                <input
                  disabled={subscribed}
                  name="email"
                  type="email"
                  placeholder="Get notified on updates !"
                  className="py-1 px-4 text-slate-300 bg-transparent border-b-[1px] border-gray-500 outline-none focus:border-yellow-300 transition-colors duration-200 w-[15rem] hover:border-gray-300"
                  onChange={(e) => {
                    if (
                      e.target.value.length > 0 &&
                      e.target.value.includes("@") &&
                      e.target.value.includes(".")
                    ) {
                      setIsEmail(() => true);
                    } else {
                      setIsEmail(() => false);
                    }
                  }}
                />
                <button
                  type="submit"
                  className={`px-4 py-3 rounded-xl bg-transparent bg-gradient-to-br from-pink-600 to-violet-950 w-[9rem] flex flex-row justify-center items-center transition-transform duration-200 gap-3 ${
                    isEmail ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={isEmail && !subscribed ? false : true}
                >
                  <span className="text-white">
                    {subscribed ? "Subscribed 🎉" : "Subscribe"}
                  </span>
                  {submitted && <NewsLetterSubmitLoader />}
                </button>
              </form>
              <div className="socials">
                <ul className="flex flex-row flex-wrap gap-5 text-lg">
                  <Link href="https://www.instagram.com/">
                    <li className="instagram rounded-3xl p-[10px] bg-gray-700 duration-150 text-red-600 hover:bg-red-600 hover:text-black">
                      <FaInstagram />
                    </li>
                  </Link>
                  <Link href="https://www.github.com/">
                    <li className="github rounded-3xl p-[10px] bg-gray-700 duration-150 hover:bg-white hover:text-black">
                      <FaGithubAlt />
                    </li>
                  </Link>
                  <Link href="https://www.instagram.com/">
                    <li className="twitter rounded-3xl p-[10px] bg-gray-700 duration-150 text-black hover:bg-black hover:text-white">
                      <FaXTwitter />
                    </li>
                  </Link>
                  <Link href="https://www.instagram.com/">
                    <li className="linkedin rounded-3xl p-[10px] bg-gray-700 duration-150  text-blue-500 hover:bg-blue-500 hover:text-black">
                      <FaLinkedinIn />
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </footer>
  );
}

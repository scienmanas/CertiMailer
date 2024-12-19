"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo/logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { SiFarcaster } from "react-icons/si";
import { useState } from "react";
import { SubscribeToNewsletter } from "@/app/lib/controls/newsletter";
import { SubmissionLoader } from "@/app/ui/loaders";
import { SiBuymeacoffee } from "react-icons/si";
import { SiSolana } from "react-icons/si";
import { RiBtcFill } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";
import { IconType } from "react-icons";

type donationType = {
  name: string;
  icon: IconType;
  address: string;
};

export function Footer(): JSX.Element {
  // Define all the navigation and legal links
  const links = [
    {
      category: "Navigation",
      items: [
        { site: "About", link: "/" },
        { site: "Blog", link: "/blog" },
        { site: "Verify", link: "/" },
        { site: "Register", link: "/auth/register" },
      ],
    },
    {
      category: "Legal",
      items: [
        { site: "License", link: "/legal/license" },
        { site: "Terms of use", link: "/legal/terms" },
        { site: "Privacy policy", link: "/legal/privacy-policy" },
      ],
    },
    {
      category: "Know",
      items: [{ site: "@scienmamas", link: "https://x.com/scienmanas" }],
    },
  ];

  // Define social media links and their respective icons
  const socialLinks = [
    { name: "Twitter (X)", icon: FaXTwitter, link: "https://x.com/scienmanas" },
    {
      name: "Youtube",
      icon: FaYoutube,
      link: "https://youtube.com/@scienmanas",
    },
    { name: "Mail", icon: CiMail, link: "mailto:manas@certimailer.xyz" },
    {
      name: "Github",
      icon: FiGithub,
      link: "https://github.com/scienmanas/CertiMailer",
    },
    {
      name: "Farcaster",
      icon: SiFarcaster,
      link: "https://warpcast.com/scienmanas",
    },
  ];

  const donationLinks: donationType[] = [
    {
      name: "Buy me a coffee",
      icon: SiBuymeacoffee,
      address: "https://buymeacoffee.com/scienmanas",
    },
    {
      name: "Bitcoin",
      icon: RiBtcFill,
      address:
        "https://btcscan.org/address/bc1qwcahm8aq9uqg5zthnvnkvl0vxkm3wku90hs4j4",
    },
    {
      name: "Ethereum",
      icon: FaEthereum,
      address:
        "https://etherscan.io/address/0x54da97548d91f8A157634C3a60f82831cD913A9c",
    },
    {
      name: "Solana",
      icon: SiSolana,
      address:
        "https://solscan.io/account/E3FrcftDnb1FXDpRBA96ja7vQmWnQ8mTk85i7m85FmhD",
    },
  ];

  // State variables for newsletter subscription process
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean | string | null>(
    null
  );

  // Function to handle the newsletter subscription form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission
    setIsSubmitting(true); // Set submitting state to true

    // Get email value from the form data
    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;

    // Send request and update the state
    const response = await SubscribeToNewsletter(email);
    if (response.status === 201) setIsSubscribed(true);
    else if (response.status === 409) setIsSubscribed("Hmm, already");
    setIsSubmitting(false); // Set submitting state to false
  };

  return (
    <footer className="w-full h-fit border-t dark:border-[#3b3b41] border-[#d4d4d8] flex items-center justify-center">
      <div className="footer-wrapper w-full max-w-screen-2xl flex flex-col gap-8 items-center justify-center px-4 pb-8 pt-12">
        <div className="contents-footer w-full items-center justify-between h-fit flex flex-row flex-wrap gap-10 ">
          <div className="logo-and-form flex flex-col gap-6">
            {/* Logo section */}
            <div className="logo-content flex flex-row gap-2 items-center">
              <div className="logo w-fit h-fit">
                <Image
                  src={logo}
                  alt="logo"
                  width={20}
                  height={20}
                  className="w-fit h-fit"
                />
              </div>
              <div className="text-company-name text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                CertiMailer
              </div>
            </div>

            {/* Newsletter signup form */}
            <form
              onSubmit={handleFormSubmit}
              className="flex w-fit h-fit flex-col gap-3"
            >
              <div className="text-for-signup w-fit dark:text-neutral-100 text-neutral-700 h-fit">
                Sign up for our newsletter
              </div>
              <div className="form-input-and-submit flex flex-row gap-2 flex-wrap w-fit h-fit items-center">
                {/* Email input */}
                <label htmlFor="">
                  <input
                    disabled={isSubmitting || (isSubscribed as boolean)}
                    autoComplete="off"
                    required
                    placeholder="Email"
                    className="dark:bg-[#27272a] bg-neutral-300 dark:text-neutral-300 text-neutral-800 border dark:border-[#414147] rounded-md px-4 py-2 w-[244px] h-fit outline-none focus:outline-1 focus:outline-purple-400 duration-300 focus:border-transparent dark:placeholder:text-neutral-400 placeholder:text-neutral-600"
                    type="email"
                    name="email"
                    id="email"
                  />
                </label>

                {/* Submit button */}
                <label htmlFor="">
                  <button
                    type="submit"
                    disabled={isSubmitting || (isSubscribed as boolean)}
                    className={`text-center w-32 h-[42px] bg-transparent bg-gradient-to-tr from-[#7e3eee] to-purple-800 rounded-md font-semibold duration-300   text-neutral-200 dark:text-neutral-200 flex flex-row items-center justify-center gap-1 ${
                      isSubmitting || isSubscribed
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:to-purple-900 hover:from-[#6e33d4]"
                    }`}
                  >
                    <span>
                      {isSubscribed === null || isSubscribed === false
                        ? "Subscribe"
                        : isSubscribed === true
                        ? "Subscribed"
                        : "Hmm 🤔"}
                    </span>
                    {isSubmitting && (
                      <SubmissionLoader
                        color="pink"
                        height={20}
                        width={20}
                        key={1}
                      />
                    )}
                  </button>
                </label>
              </div>
            </form>
          </div>

          {/* Link sections */}
          <div className="links flex flex-row flex-wrap gap-8 items-start h-fit w-fit">
            {links.map((linksData, index) => (
              <div key={index} className="links-wrapper flex flex-col gap-2">
                <div className="heading font-bold">{linksData.category}</div>
                <ul className="flex flex-col items-start justify-center gap-1">
                  {linksData.items.map((linkData, index) => (
                    <li
                      key={index}
                      className="h-fit w-fit dark:text-neutral-400 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-900 duration-300"
                    >
                      <Link className="w-fit h-fit" href={linkData.link}>
                        {linkData.site}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Donations */}
        <div className="donations flex flex-col gap-3 w-full items-start">
          <div className="heading text-xl dark:text-neutral-200 text-neutral-700 font-semibold">
            Support Us
          </div>
          <div className="text-donation text-sm sm:text-base dark:text-neutral-200 text-neutral-700 text-wrap max-w-[40rem]">
            CertiMailer is a free and open-source project. We rely on
            contributions from the community to keep it running. You can support
            us by donating to the following addresses:
          </div>
          <div className="donation-addresses flex flex-row gap-4 items-center">
            {donationLinks.map((donation, index) => (
              <Link
                key={index}
                href={donation.address}
                className={donation.name}
              >
                <donation.icon className="text-xl dark:text-neutral-200 text-neutral-700" />
              </Link>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div className="line w-full h-[1px] dark:bg-[#3b3b41] bg-[#d4d4d8]"></div>

        {/* Footer bottom section */}
        <div className="copyright w-full h-fit flex flex-row flex-wrap gap-6 items-center justify-between ">
          <div className="text dark:text-neutral-400 text-sm w-fit h-fit text-neutral-700">
            &copy; 2024 CertiMailer. All rights reserved.
          </div>

          {/* Social media links */}
          <div className="social-links w-fit h-fit flex flex-row gap-1">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                className="p-2 rounded-lg dark:hover:bg-neutral-700 hover:bg-neutral-200 duration-300"
              >
                <link.icon className="text-lg dark:text-neutral-400 text-neutral-600" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

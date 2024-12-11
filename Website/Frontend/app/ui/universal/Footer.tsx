"use client"; // Ensures this component is treated as a client-side component

// Import necessary components and assets
import Image from "next/image"; // Next.js component for optimized image rendering
import Link from "next/link"; // Link component for client-side navigation
import logo from "@/public/assets/logo/logo.png"; // Logo image import

// Import required icons from various libraries
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { SiFarcaster } from "react-icons/si";

// Import React hooks
import { useState } from "react"; // useState for handling state

// Import for handling navigation redirection on failure
import { notFound } from "next/navigation";

// Import for custom submission loader component
import { SubmissionLoader } from "@/app/ui/loaders";

// Footer component definition
export function Footer(): JSX.Element {
  // Define all the navigation and legal links
  const links = [
    {
      category: "Navigation",
      items: [
        { site: "Blog", link: "/blog" },
        { site: "Overview", link: "/" },
        { site: "About", link: "/" },
        { site: "Contact", link: "/" },
      ],
    },
    {
      category: "Legal",
      items: [
        { site: "License", link: "/license" },
        { site: "Terms of use", link: "/terms" },
        { site: "Privacy policy", link: "/privacy-policy" },
        { site: "Support", link: "/support" },
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

  // State variables for newsletter subscription process
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To track form submission state
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false); // To track subscription status

  // Function to handle the newsletter subscription form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission
    setIsSubmitting(true); // Set submitting state to true

    // Backend URI from environment variables
    const API_URI: string = (process.env.BACKEND_URI +
      "/user/newsletter-user") as string;

    // Get email value from the form data
    const formData = new FormData(e.currentTarget);
    const email: string = formData.get("email") as string;

    // API request to handle newsletter subscription
    try {
      await fetch(API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email as payload
      });

      setIsSubscribed(true); // Set subscription state to true on success
    } catch (error) {
      console.error(error); // Log error in case of failure
      notFound(); // Redirect to not found page in case of error
    } finally {
      setIsSubmitting(false); // Set submitting state to false
    }
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
              // onSubmit={handleFormSubmit} Uncomment for form action
              className="flex w-fit h-fit flex-col gap-3"
            >
              <div className="text-for-signup w-fit dark:text-neutral-100 text-neutral-700 h-fit">
                Sign up for our newsletter
              </div>
              <div className="form-input-and-submit flex flex-row gap-2 flex-wrap w-fit h-fit items-center">
                {/* Email input */}
                <label htmlFor="">
                  <input
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
                    className="text-center w-32 h-[42px] bg-transparent bg-gradient-to-tr from-[#7e3eee] to-purple-800 rounded-md font-semibold duration-300 hover:from-[#6e33d4] hover:to-purple-900 text-neutral-200 dark:text-neutral-200 flex flex-row items-center justify-center gap-1"
                  >
                    <span>Subscribe</span>
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

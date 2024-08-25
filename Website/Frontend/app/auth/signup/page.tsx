"use client";

import { useEffect, useState } from "react";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { FaCameraRetro } from "react-icons/fa";
import { TopLoader } from "@/app/ui/components/top-loader";
import { SubmissionLoader } from "@/app/ui/loaders";
import logo from "@/public/assets/logo/logo_fig_nobg.png";
import slide1 from "@/public/assets/auth/login-1.png";
import slide2 from "@/public/assets/auth/login-2.png";

export default function Signup(): JSX.Element {
  // Define next router
  const router = useRouter();

  // Redirect when auth-token present logic
  useEffect(() => {
    const authToken = Cookies.get("auth-token");
    if (authToken) {
      // redirect to console
      router.push("/console");
    }
  }, []);

  // Images slide
  const slides = [
    {
      id: 0,
      img: slide1,
      text: {
        heading: "Open Source",
        description:
          "We are completely open-source, everything is free here, but yes with some limits.",
      },
    },
    {
      id: 1,
      img: slide2,
      text: {
        heading: "Verification",
        description:
          "Be it a card, certificate, or even a pass, we support verification of all of these.",
      },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Submissions & error
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  // To store the values in forms and UI enchancements
  const [name, setName] = useState<string>("Gagan Vedhi"); // It works "" -> thing
  const [email, setEmail] = useState<string>("astronomyclub@iittp.ac.in"); // It works "" -> thing
  const [image, setImage] = useState<string | null>(null);

  // Top Loader running on every occassions - varibale
  const [startTopLoader, setStartTopLoader] = useState<boolean>(true);

  const handleInitialFormSubmission: React.FormEventHandler<
    HTMLFormElement
  > = async (e) => {
    // Prevent default
    e.preventDefault();

    // start loader
    setIsSubmitting(true);
    setStartTopLoader(true);

    // Get the form data
    const formData = new FormData(e.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
  };

  const handleOtpSubmission: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    // start loader
    setIsSubmitting(true);
    setStartTopLoader(true);
    //Logic
  };

  const handleFinalDetailsAndSubmit: React.FormEventHandler<
    HTMLFormElement
  > = async () => {
    //Logic
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev): number =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Top stop loading bar once the page is loaded - ui
  useEffect(() => {
    setStartTopLoader(false);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {startTopLoader && <TopLoader />}
      <div className="contents-wrapper flex flex-row w-fit h-fit rounded-xl relative">
        <div className="slides-wrapper relative z-10 bg-[#2357ba] lg:px-20 xl:px-28 xl:py-24 lg:py-16 hidden rounded-tl-xl rounded-bl-xl lg:flex items-center flex-col justify-center ">
          <div className="wrap relative flex flex-col gap-14 items-center justify-center w-[322px]">
            <div className="relative z-20 slider w-[240px] flex overflow-x-hidden overflow-y-clip h-fit items-center">
              <div
                style={{
                  width: 240 * slides.length,
                  transform: `translateX(-${currentSlide * 240}px)`,
                  transition: "transform 0.5s ease-in-out",
                }}
                className="relative z-10 slides justify-center flex flex-row"
              >
                {slides.map((slideData, key) => (
                  <div
                    key={key}
                    className="bg-cover bg-center w-60 h-auto shrink-0 flex items-center justify-center"
                  >
                    <Image width={240} src={slideData.img} alt="slide" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative text-content w-[322px] h-fit items-center justify-center flex overflow-scroll ">
              <div
                style={{
                  width: 322,
                }}
                className="text-content-wrapper relative flex flex-row"
              >
                {slides.map((slidesData, key) => (
                  <div
                    style={{
                      width: 322,
                      display: currentSlide === slidesData.id ? "" : "none",
                    }}
                    className="text-wrapper flex flex-col gap-4"
                    key={key}
                  >
                    <div
                      style={{
                        height: "fit-content",
                      }}
                      className="heading text-neutral-200 font-bold text-3xl text-center"
                    >
                      {slidesData.text.heading}
                    </div>
                    <div
                      style={{
                        height: 72,
                      }}
                      className="desciption text-neutral-200 text-base text-center"
                    >
                      {slidesData.text.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute nav-box flex flex-row gap-2 -bottom-6 items-center justify-center w-full z-30">
              {slides.map((slide, key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentSlide(slide.id);
                  }}
                  className={`h-1 rounded-full w-2 transform transition-all duration-300 ${
                    slide.id === currentSlide
                      ? "bg-red-400 w-3"
                      : "bg-neutral-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
        <div className="form-space relative w-fit lg:px-20 xl:px-28 xl:py-24 lg:py-16 flex flex-col items-center gap-6 lg:gap-20 bg-neutral-50 rounded-xl lg:rounded-tr-xl lg:rounded-br-xl lg:rounded-bl-none lg:rounded-tl-none md:px-10 md:py-14 sm:px-8 sm:py-12 px-7 pb-12 pt-4">
          <div className="head-space w-full items-center justify-center flex flex-col gap-1">
            <Link onClick={() => setStartTopLoader(true)} href={"/"}>
              <Image alt="logo" src={logo} width={150} height={150} />
            </Link>
            <h1 className="font-bold  text-xl sm:text-2xl text-neutral-600">
              Resgister Now !
            </h1>
            <p className="w-60 text-sm sm:text-base text-center">
              We will verify your details and if required, will reach you
              through mail.
            </p>
          </div>
          <div className="forms w-full">
            <form
              className="flex flex-col w-fit gap-10 hidden"
              onSubmit={handleInitialFormSubmission}
            >
              <div className="feild-elements flex flex-col gap-4 w-fit">
                <div className="input-and-error flex flex-col gap-2">
                  <div className="input-elements flex flex-col gap-4">
                    <label
                      onClick={() => setError(null)}
                      htmlFor=""
                      className={`flex bg-[#f3f4f4] relative z-10 items-center justify-between px-5 py-3 rounded-lg group border-2 border-gray-300 gap-1 w-fit focus-within:border-blue-500 ${
                        error ? "border-red-600" : ""
                      } focus-within:border-blue-500`}
                    >
                      <input
                        type="text"
                        name="name"
                        id=""
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#f3f4f4] outline-none text-sm sm:text-base sm:w-64 "
                      />
                      <span
                        className={`absolute text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] bg-transparent group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-white group-focus-within:bg-gradient-to-b from-white to-[#f3f4f4] group-focus-within:px-1 ${
                          name.length > 0
                            ? "-translate-y-6 scale-90 bg-gradient-to-b from-white to-[#f3f4f4] px-1"
                            : ""
                        }`}
                      >
                        Name
                      </span>
                      <GoOrganization className="text-lg sm:text-xl" />
                    </label>
                    <label
                      htmlFor=""
                      className={`flex bg-[#f3f4f4] relative z-10 items-center px-5 py-3 rounded-lg group border-2 border-gray-300 focus-:border-blue-500 gap-1 w-fit justify-between focus-within:border-blue-500 ${
                        error ? "border-red-600" : ""
                      } focus-within:border-blue-500`}
                    >
                      <input
                        type="email"
                        name="email"
                        id=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-[#f3f4f4] outline-none text-sm sm:text-base sm:w-64 "
                      />
                      <span
                        className={`absolute  text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] bg-transparent group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-white group-focus-within:bg-gradient-to-b from-white to-[#f3f4f4] group-focus-within:px-1 ${
                          email.length > 0
                            ? "-translate-y-6 scale-90 bg-gradient-to-b from-white to-[#f3f4f4] px-1"
                            : ""
                        }`}
                      >
                        Email
                      </span>
                      <MdOutlineAlternateEmail className="text-lg sm:text-xl" />
                    </label>
                  </div>
                  <div className="errors text-xs sm:text-sm px-1 font-semibold text-red-600">
                    {error}
                  </div>
                </div>
              </div>
              <div className="signup-button">
                <label htmlFor="" className="w-full ">
                  <button
                    type="submit"
                    className="w-full text-center bg-[#3e68b5] hover:bg-[#2357ba] py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <span className="text-white font-semibold">Submit</span>
                    {isSubmitting && (
                      <SubmissionLoader height={20} width={20} color="pink" />
                    )}
                  </button>
                </label>
              </div>
            </form>
            <form
              className="hidden flex flex-col w-fit gap-10"
              onSubmit={handleOtpSubmission}
            >
              <div className=" feild-elements flex flex-col gap-2 w-fit">
                <div className="text flex gap-1 flex-row">
                  <span className="text-sm">Enter OTP</span>
                  <span className="text-sm font-semibold text-blue-500">
                    ({email})
                  </span>
                </div>
                <div className="input-and-error flex flex-col gap-2">
                  <div className="input-elements flex flex-col">
                    <label
                      htmlFor=""
                      className={`flex relative z-10 items-center justify-between px-5 py-3 rounded-lg group gap-1 w-fit`}
                    >
                      {[...Array(4)].map((_, index) => (
                        <Fragment key={index}>
                          <input
                            required
                            key={index}
                            minLength={1}
                            maxLength={1}
                            onClick={() => setError(null)}
                            className={`w-10 h-14 rounded-lg border-2  text-black text-center ${
                              error ? "border-red-600" : "border-neutral-300"
                            } `}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]"
                            onInput={(e) => {
                              const target = e.target as HTMLInputElement; // Type assertion
                              if (target.value.length === 1) {
                                const nextInput = target.nextElementSibling
                                  ?.nextElementSibling as HTMLInputElement | null;
                                if (nextInput) {
                                  nextInput.focus();
                                }
                              }
                            }}
                          />
                          {index < 3 && <span className="text-2xl">-</span>}
                        </Fragment>
                      ))}
                    </label>
                  </div>
                  <div className="errors text-xs sm:text-sm px-1 font-semibold text-red-600">
                    {error}
                  </div>
                </div>
              </div>
              <div className="verify-button">
                <label htmlFor="" className="w-full">
                  <button
                    type="submit"
                    className="w-full text-center bg-[#3e68b5] hover:bg-[#2357ba] py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <span className="text-white font-semibold">Verify</span>
                    {isSubmitting && (
                      <SubmissionLoader height={20} width={20} color="pink" />
                    )}
                  </button>
                </label>
              </div>
            </form>
            <form
              className="flex flex-col w-fit gap-5"
              onSubmit={handleFinalDetailsAndSubmit}
            >
              <div className="input-elements flex flex-col gap-2 w-64 sm:w-80">
                <div className="logo-name-email flex flex-row items-center gap-2">
                  <div className="logo relative w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer flex items-center justify-center">
                    <input
                      required
                      className="absolute z-20 inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/"
                      type="file"
                      name="logo"
                      id=""
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const file = target.files?.[0] || null;
                        if (file) {
                          setImage(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {image && (
                      <Image
                        className="absolute z-10 inset-0 w-ful h-full object-cover"
                        alt="logo"
                        src={image}
                        width={70}
                        height={70}
                      />
                    )}
                    {!image && (
                      <div className="absolute z-10 w-full h-full flex justify-center items-center bg-neutral-200">
                        <FaCameraRetro className="text-xl" />
                      </div>
                    )}
                  </div>
                  <div className="email-and-nane flex flex-col">
                    <div className="name text-sm font-bold">{name}</div>
                    <div className="email text-xs">
                      <span>(</span>
                      <span className="font-semibold text-blue-700">
                        {email}
                      </span>
                      <span>)</span>
                    </div>
                  </div>
                </div>
                <div className="type-and-designation flex flex-row w-full justify-between sm:gap-2 sm:justify-start ">
                  <label className="flex flex-col" htmlFor="type">
                    <span className="text-sm">Type</span>
                    <select
                      required
                      defaultValue={"Select"}
                      name="type"
                      id="type"
                      className="text-sm px-2 py-1 w-fit h-fit rounded-md border-2 border-gray-300 focus-within:border-gray-400 bg-[#e9e9ed]"
                    >
                      <option
                        className="text-sm w-fit h-fit"
                        disabled
                        value="Select"
                      >
                        Select
                      </option>
                      <option
                        className="text-sm w-fit h-fit"
                        value="Non Profit"
                      >
                        Non Profit
                      </option>
                      <option
                        className="text-sm w-fit h-fit"
                        value="Student Club"
                      >
                        Student Club
                      </option>
                      <option className="text-sm w-fit h-fit" value="School">
                        School
                      </option>
                      <option className="text-sm w-fit h-fit" value="Corporate">
                        Corporate
                      </option>
                      <option
                        className="text-sm w-fit h-fit"
                        value="Competitions"
                      >
                        Competitions
                      </option>
                      <option className="text-sm w-fit h-fit" value="others">
                        Others
                      </option>
                    </select>
                  </label>
                  <label className="flex flex-col" htmlFor="designation">
                    <span className="text-sm">Designaion</span>
                    <select
                      required
                      className="text-sm px-2 py-1 w-fit h-fit rounded-md border-2 border-gray-300 focus-within:border-gray-400 bg-[#e9e9ed]"
                      defaultValue={"Select"}
                      name="designation"
                      id=""
                    >
                      <option disabled value="Select">
                        Select
                      </option>
                      <option value="Club Head">Club Head</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Employee">Employee</option>
                      <option value="Oraganizer">Organizer</option>
                      <option value="Others">Others</option>
                    </select>
                  </label>
                </div>
                <div className="about-and-reason w-full h-fit flex flex-col gap-1">
                  <div className="about w-full h-fit">
                    <textarea
                      minLength={50}
                      required
                      placeholder="About the organisation ?"
                      className="w-full h-12 bg-[#e9e9ed] rounded-md px-2 py-2 text-xs border-2 border-gray-300"
                      name="about"
                      id=""
                    ></textarea>
                  </div>
                  <div className="reason w-full h-fit">
                    <textarea
                      minLength={50}
                      required
                      placeholder="Reason for registering ?"
                      className="w-full h-12 bg-[#e9e9ed] rounded-md px-2 py-2 text-xs border-2 border-gray-300"
                      name="reason"
                      id=""
                    ></textarea>
                  </div>
                </div>
                <div className="webiste">
                  <input
                    required
                    name="website"
                    placeholder="Website ?"
                    className="w-full bg-[#e9e9ed] border-2 border-gray-300 px-2 py-2 rounded-md text-sm"
                    type="text"
                  />
                </div>
              </div>
              <div className="submit-button w-full">
                <label htmlFor="" className="w-full">
                  <button
                    type="submit"
                    className="w-full text-center bg-[#3e68b5] hover:bg-[#2357ba] py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <span className="text-white font-semibold">Submit</span>
                    {isSubmitting && (
                      <SubmissionLoader height={20} width={20} color="pink" />
                    )}
                  </button>
                </label>
              </div>
            </form>
          </div>
          <div className="bottom-register-links absolute bottom-4 w-fit flex flex-row gap-2 items-center">
            <span className="text-[#727272] text-sm">Already regsitered?</span>
            <span className="text-blue-500 font-bold text-sm hover:underline duration-200 transition transform">
              <Link
                onClick={() => setStartTopLoader(true)}
                href={"/auth/login"}
              >
                Login now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

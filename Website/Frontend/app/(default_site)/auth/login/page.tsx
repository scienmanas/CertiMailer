"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { TopLoader } from "@/app/ui/components/top-loader";
import { SubmissionLoader } from "@/app/ui/loaders";
import logo from "@/public/assets/logo/logo.png";
import slide1 from "@/public/assets/auth/login-1.png";
import slide2 from "@/public/assets/auth/login-2.png";

export default function Login(): JSX.Element {
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

  // Submissions
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  // UI enchancements
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>(""); // It works "" -> thing
  const [email, setEmail] = useState<string>(""); // It works "" -> thing

  // Top Loader running on every occassions - varibale
  const [startTopLoader, setStartTopLoader] = useState<boolean>(false);

  const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    // Prevent default
    e.preventDefault();

    // start loader
    setIsSubmitting(true);
    setStartTopLoader(true);

    // API URI
    const API = "http://localhost:5000/api/auth/login";

    // Get the form data
    const formData = new FormData(e.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    const rememberMe: boolean = formData.get("remember") === "on";

    try {
      // Hit API endpoint
      const res: Response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // take out data
      const data = await res.json();

      // Implement the status code logic here
      if (res.status === 200) {
        console.log("Tum paass ho bacha");
        // Store cookies redirect the user to his concole
        Cookies.set("auth-token", data, {
          expires: rememberMe ? 7 : undefined,
        });
        router.push("/console");
      } else if (res.status === 404) {
        setError("User doesn't exists");
      } else if (res.status === 401) {
        setError("Wrong Credentials");
      } else if (res.status === 500) {
        setError("Some error occurred");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    } finally {
      setIsSubmitting(false);
      setStartTopLoader(false);
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev): number =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

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
        <div className="form-space relative w-fit  lg:px-20 xl:px-28 xl:py-24 lg:py-16 flex flex-col items-center gap-14 lg:gap-20 bg-neutral-50 rounded-xl  lg:rounded-tr-xl lg:rounded-br-xl lg:rounded-bl-none lg:rounded-tl-none md:px-10 md:py-14 sm:px-8 sm:py-12 px-7 py-12">
          <div className="head-space w-full items-center justify-center flex flex-col gap-1">
            <Link onClick={() => setStartTopLoader(true)} href={"/"}>
              <Image alt="logo" src={logo} width={150} height={150} />
            </Link>
            <h1 className="font-bold  text-xl sm:text-2xl text-neutral-600">
              Welcome Back !
            </h1>
            <p className="w-60 text-sm sm:text-base text-center">
              Hey! we are delighted to see you back, let's begin 😊
            </p>
          </div>
          <form
            className="flex flex-col w-fit gap-10"
            onSubmit={handleFormSubmission}
          >
            <div className="feild-elements flex flex-col gap-4 w-fit">
              <div className="input-and-error flex flex-col gap-2">
                <div className="input-elements flex flex-col gap-4">
                  <label
                    onClick={() => setError(null)}
                    htmlFor=""
                    className={`flex bg-[#f3f4f4] relative z-10 items-center justify-between px-5 py-3 rounded-lg group border-2 border-gray-300 w-fit focus-within:border-blue-500 ${
                      error ? "border-red-600" : ""
                    } focus-within:border-blue-500`}
                  >
                    <input
                      type="email"
                      name="email"
                      id=""
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#f3f4f4] outline-none text-sm sm:text-base sm:w-64 "
                    />
                    <span
                      className={`absolute text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] bg-transparent group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-white group-focus-within:bg-gradient-to-b from-white to-[#f3f4f4] group-focus-within:px-1 ${
                        email.length > 0
                          ? "-translate-y-6 scale-90 bg-gradient-to-b from-white to-[#f3f4f4] px-1"
                          : ""
                      }`}
                    >
                      Email
                    </span>
                    <MdOutlineAlternateEmail className="text-lg sm:text-xl" />
                  </label>
                  <label
                    htmlFor=""
                    className={`flex bg-[#f3f4f4] relative z-10 items-center px-5 py-3 rounded-lg group border-2 border-gray-300 focus-:border-blue-500 gap-1 w-fit justify-between focus-within:border-blue-500 ${
                      error ? "border-red-600" : ""
                    } focus-within:border-blue-500`}
                  >
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      minLength={8}
                      maxLength={15}
                      id=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-[#f3f4f4] outline-none text-sm sm:text-base sm:w-64 "
                    />
                    <span
                      className={`absolute  text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] bg-transparent group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-white group-focus-within:bg-gradient-to-b from-white to-[#f3f4f4] group-focus-within:px-1 ${
                        password.length > 0
                          ? "-translate-y-6 scale-90 bg-gradient-to-b from-white to-[#f3f4f4] px-1"
                          : ""
                      }`}
                    >
                      Password
                    </span>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? (
                        <FaEye className="text-base sm:text-lg" />
                      ) : (
                        <FaEyeSlash className="text-base sm:text-lg" />
                      )}
                    </button>
                  </label>
                </div>
                <div className="errors text-xs sm:text-sm px-1 font-semibold text-red-600">
                  {error}
                </div>
              </div>

              <div className="links flex items-center justify-between w-full">
                <label
                  htmlFor="remember-checkbox"
                  className="flex items-center gap-1"
                >
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember-checkbox"
                    className="cursor-pointer scale-90 sm:scale-100"
                  />
                  <span className="text-neutral-700 text-xs sm:text-sm cursor-pointer select-none">
                    Remember me
                  </span>
                </label>
                <Link
                  href={"/auth/forgot-password"}
                  className="text-xs sm:text-sm text-blue-600 font-semibold"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
            <div className="login-button">
              <label htmlFor="" className="w-full ">
                <button
                  type="submit"
                  className="w-full text-center bg-[#3e68b5] hover:bg-[#2357ba] py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <span className="text-white font-semibold">Log in</span>
                  {isSubmitting && (
                    <SubmissionLoader height={20} width={20} color="pink" />
                  )}
                </button>
              </label>
            </div>
          </form>
          <div className="bottom-register-links absolute bottom-4 w-fit flex flex-row gap-2 items-center">
            <span className="text-[#727272] text-sm">Not regsitered?</span>
            <span className="text-blue-500 font-bold text-sm hover:underline duration-200 transition transform">
              <Link
                onClick={() => setStartTopLoader(true)}
                href={"/auth/signup"}
              >
                Submit a request
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

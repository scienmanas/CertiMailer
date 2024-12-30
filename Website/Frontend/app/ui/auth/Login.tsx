"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { TopLoader } from "@/app/ui/loaders";
import { SubmissionLoader } from "@/app/ui/loaders";
import { PageLoader } from "@/app/ui/loaders";
import { handleLogin, validateCredentials } from "@/app/lib/controls/auth";
import logo from "@/public/assets/logo/logo.png";
import slide1 from "@/public/assets/auth/login-1.png";
import slide2 from "@/public/assets/auth/login-2.png";

export function Login(): JSX.Element {
  // Define next router
  const router = useRouter();

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

  // Submissions
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] =
    useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  // UI enchancements
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // Top Loader running on every occassions - varibale
  const [startTopLoader, setStartTopLoader] = useState<boolean>(true);
  const [Mounted, setMounted] = useState<boolean>(false);

  const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    // Prevent default
    e.preventDefault();

    // start loader & set all errror to null
    toast.info("Login you in 😁...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setError(null);
    setIsSubmitting(true);
    setStartTopLoader(true);

    // Get the form data
    const formData = new FormData(e.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    const rememberMe: boolean = formData.get("remember") === "on";

    const response = await handleLogin({
      email: email,
      password: password,
      rememberMe: rememberMe,
    });
    // Reset the loaders
    setIsSubmitting(false);

    if (response.status === 200) {
      // Cookies and redirect
      setIsSubmissionSuccessful(true);
      toast.success("Authenticated 🥳", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } else {
      // Show error
      setStartTopLoader(false);
      setError(response.message);
      toast.error(`${response.message} 😔`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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

  // Redirect when auth-token present logic
  useEffect(() => {
    const checkCredentials = async () => {
      const response = await validateCredentials();
      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        setMounted(true);
        setStartTopLoader(false);
      }
    };
    checkCredentials();
  }, [router]);

  // Load page only if mouting is done
  if (!Mounted) return <PageLoader />;
  else
    return (
      <div className="w-full h-full flex items-center justify-center dark:bg-gray-900">
        {startTopLoader && <TopLoader />}
        <ToastContainer />
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
              <div className="relative text-content w-[322px] h-fit items-center justify-center flex overflow-hidden ">
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
                        className="heading text-neutral-200 dark:text-neutral-100 font-bold text-3xl text-center"
                      >
                        {slidesData.text.heading}
                      </div>
                      <div
                        style={{
                          height: 72,
                        }}
                        className="desciption text-neutral-200 dark:text-neutral-300 text-base text-center"
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
                        : "bg-neutral-300 dark:bg-neutral-600"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          <div className="form-space relative w-fit lg:px-20 xl:px-28 xl:py-24 lg:py-16 flex flex-col items-center gap-14 lg:gap-20 bg-neutral-50 dark:bg-gray-800 rounded-xl lg:rounded-tr-xl lg:rounded-br-xl lg:rounded-bl-none lg:rounded-tl-none md:px-10 md:py-14 sm:px-8 sm:py-12 px-7 py-12">
            <div className="head-space w-full items-center justify-center flex flex-col gap-1">
              <Link onClick={() => setStartTopLoader(true)} href={"/"}>
                <Image alt="logo" src={logo} width={150} height={150} />
              </Link>
              <h1 className="font-bold text-xl sm:text-2xl text-neutral-600 dark:text-neutral-200">
                Welcome Back !
              </h1>
              <p className="w-60 text-sm sm:text-base text-center text-neutral-700 dark:text-neutral-300">
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
                      htmlFor="email"
                      className={`flex bg-[#f3f4f4] dark:bg-gray-700 relative z-10 items-center justify-between px-5 py-3 rounded-lg group border-2 border-gray-300 dark:border-gray-600 w-fit focus-within:border-blue-500 dark:focus-within:border-blue-400 ${
                        error ? "border-red-600 dark:border-red-500" : ""
                      } focus-within:border-blue-500`}
                    >
                      <input
                        disabled={isSubmitting || isSubmissionSuccessful}
                        autoComplete="off"
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#f3f4f4] dark:bg-gray-700 dark:text-neutral-200 outline-none text-sm sm:text-base sm:w-64"
                      />
                      <span
                        className={`absolute text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] dark:bg-gray-700 group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-gradient-to-b group-focus-within:from-[#fafafa] to-[#f3f4f4] dark:group-focus-within:from-[#1f2937] dark:group-focus-within:to-[#374151] group-focus-within:px-1 group-focus-within:-translate-x-1 select-none pointer-events-none  ${
                          email.length > 0
                            ? "-translate-y-6 scale-90 bg-gradient-to-b dark:from-[#1f2937] dark:to-[#374151] px-1 -translate-x-1 from-[#fafafa] to-[#f3f4f4]"
                            : ""
                        }`}
                      >
                        Email
                      </span>
                      <MdOutlineAlternateEmail className="text-lg sm:text-xl dark:text-neutral-200" />
                    </label>
                    <label
                      onClick={() => setError(null)}
                      htmlFor="password"
                      className={`flex bg-[#f3f4f4] dark:bg-gray-700 relative z-10 items-center px-5 py-3 rounded-lg group border-2 border-gray-300 dark:border-gray-600 focus-:border-blue-500 gap-1 w-fit justify-between focus-within:border-blue-500 dark:focus-within:border-blue-400 ${
                        error ? "border-red-600 dark:border-red-500" : ""
                      } focus-within:border-blue-500`}
                    >
                      <input
                        disabled={isSubmitting || isSubmissionSuccessful}
                        type={`${showPassword ? "text" : "password"}`}
                        name="password"
                        minLength={8}
                        maxLength={15}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-[#f3f4f4] dark:bg-gray-700 dark:text-neutral-200 outline-none text-sm sm:text-base sm:w-64"
                      />
                      <span
                        className={`absolute text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] dark:bg-gray-700 group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-gradient-to-b group-focus-within:from-[#fafafa] to-[#f3f4f4] dark:group-focus-within:from-[#1f2937] dark:group-focus-within:to-[#374151] group-focus-within:px-1 group-focus-within:-translate-x-1 select-none pointer-events-none  ${
                          password.length > 0
                            ? "-translate-y-6 scale-90 bg-gradient-to-b dark:from-[#1f2937] dark:to-[#374151] px-1 -translate-x-1 from-[#fafafa] to-[#f3f4f4]"
                            : ""
                        }`}
                      >
                        Password
                      </span>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        className="dark:text-neutral-200"
                      >
                        {showPassword ? (
                          <FaEye className="text-base sm:text-lg" />
                        ) : (
                          <FaEyeSlash className="text-base sm:text-lg" />
                        )}
                      </button>
                    </label>
                  </div>
                  <div className="errors text-xs w-fit text-wrap h-4 sm:text-sm px-1 font-semibold text-red-600 dark:text-red-400">
                    {error}
                  </div>
                </div>

                <div className="links flex items-center justify-between w-full">
                  <label
                    htmlFor="remember-checkbox"
                    className="flex items-center gap-1"
                  >
                    <input
                      disabled={isSubmitting || isSubmissionSuccessful}
                      type="checkbox"
                      name="remember"
                      id="remember-checkbox"
                      className="cursor-pointer scale-90 sm:scale-100"
                    />
                    <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm cursor-pointer select-none">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href={"/auth/reset-password"}
                    className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
              <div className="login-button">
                <label htmlFor="" className="w-full ">
                  <button
                    disabled={isSubmitting || isSubmissionSuccessful}
                    type="submit"
                    className={`w-full text-center bg-[#3e68b5]  dark:bg-[#2357ba] py-3 rounded-lg flex items-center justify-center gap-2 duration-200 ${
                      isSubmissionSuccessful || isSubmitting
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:bg-[#2357ba] dark:hover:bg-[#1a4a8d]"
                    }`}
                  >
                    <span className="text-white font-semibold">
                      {isSubmitting
                        ? "Login u in"
                        : isSubmissionSuccessful
                        ? "Logged in"
                        : "Log in"}
                    </span>
                    {isSubmitting && (
                      <SubmissionLoader height={20} width={20} color="pink" />
                    )}
                  </button>
                </label>
              </div>
            </form>
            <div className="bottom-register-links absolute bottom-4 w-fit flex flex-row gap-2 items-center">
              <span className="text-[#727272] dark:text-neutral-400 text-sm">
                Not regsitered?
              </span>
              <span className="text-blue-500 dark:text-blue-400 font-bold text-sm hover:underline duration-200 transition transform">
                <Link
                  onClick={() => setStartTopLoader(true)}
                  href={"/auth/register"}
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

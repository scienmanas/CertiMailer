"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { TopLoader } from "@/app/ui/loaders";
import { SubmissionLoader } from "@/app/ui/loaders";
import { getOtp } from "@/app/lib/controls/auth";
import { handleRegister } from "@/app/lib/controls/auth";
import { validateEmail } from "@/app/utils/validators";
import { validateCredentials } from "@/app/lib/controls/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { PageLoader } from "@/app/ui/loaders";
import logo from "@/public/assets/logo/logo.png";
import slide1 from "@/public/assets/auth/login-1.png";
import slide2 from "@/public/assets/auth/login-2.png";

export function Register(): JSX.Element {
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

  // Submissions & error
  const [startTopLoader, setStartTopLoader] = useState<boolean>(true);
  const [Mounted, setMounted] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] =
    useState<boolean>(false);
  const [isFetchingOtp, setIsFetchingOtp] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    // Prevent default
    e.preventDefault();

    // start loader & set all errror to null
    toast.info("Submitting Application 😁...", {
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

    // Get the form data & call registration function
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await handleRegister(formData);
    // Reset the loaders
    setIsSubmitting(false);

    if (response.status === 201) {
      // Redirect and celebratiom
      setIsSubmissionSuccessful(true);
      toast.success("Application Submitted 🥳", {
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
        router.push("/");
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="contents-wrapper flex flex-row w-fit h-fit rounded-xl relative">
          <div className="slides-wrapper relative z-10 bg-[#2357ba] dark:bg-[#1a4a8d] lg:px-20 lg:py-16 hidden rounded-tl-xl rounded-bl-xl lg:flex items-center flex-col justify-center ">
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
          <div className="form-space relative w-fit lg:px-20 lg:py-16 flex flex-col items-center gap-6 lg:gap-20 bg-neutral-50 dark:bg-gray-800 rounded-xl lg:rounded-tr-xl lg:rounded-br-xl lg:rounded-bl-none lg:rounded-tl-none md:px-10 md:py-14 sm:px-8 sm:py-12 px-7 pb-12 pt-4">
            <div className="head-space w-full items-center justify-center flex flex-col gap-1">
              <Link onClick={() => setStartTopLoader(true)} href={"/"}>
                <Image alt="logo" src={logo} width={100} height={100} />
              </Link>
              <h1 className="font-bold text-xl sm:text-2xl text-neutral-600 dark:text-neutral-200">
                Resgister Now !
              </h1>
              <p className="w-60 text-sm sm:text-base text-center underline text-neutral-700 dark:text-neutral-300">
                If you are applying for an organization please fill org name in
                name field.
              </p>
            </div>
            <div className="forms-wrapper w-[16rem] sm:w-[20rem] h-fit">
              <div className="forms w-[16rem] sm:w-[20rem] flex flex-row h-fit">
                <form
                  className="flex flex-col w-full gap-2 md:gap-10 justify-center"
                  onSubmit={handleFormSubmission}
                >
                  <div className="feild-elements flex flex-col gap-4 w-full">
                    <div className="input-and-error flex flex-col gap-2">
                      <div className="input-elements flex flex-col gap-2">
                        <label
                          onClick={() => setError(null)}
                          htmlFor="name"
                          className={`flex bg-[#f3f4f4] dark:bg-gray-700 relative z-10 items-center justify-between px-5 py-3 rounded-lg group border-2 border-gray-300 dark:border-gray-600 gap-1 w-full dark:focus-within:border-blue-400  focus-within:border-blue-500`}
                        >
                          <input
                            disabled={
                              isFetchingOtp ||
                              isSubmitting ||
                              isSubmissionSuccessful
                            }
                            autoComplete="off"
                            autoCorrect="off"
                            type="text"
                            name="name"
                            id="name"
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#f3f4f4] dark:bg-gray-700 dark:text-neutral-200 outline-none text-sm sm:text-base sm:w-64"
                          />
                          <span
                            className={`absolute text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] dark:bg-gray-700 group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-gradient-to-b group-focus-within:from-[#fafafa] to-[#f3f4f4] dark:group-focus-within:from-[#1f2937] dark:group-focus-within:to-[#374151] group-focus-within:px-1 group-focus-within:-translate-x-1 select-none pointer-events-none  ${
                              name.length > 0
                                ? "-translate-y-6 scale-90 bg-gradient-to-b dark:from-[#1f2937] dark:to-[#374151] px-1 -translate-x-1 from-[#fafafa] to-[#f3f4f4]"
                                : ""
                            }`}
                          >
                            Name
                          </span>
                          <GoOrganization className="text-lg sm:text-xl dark:text-neutral-200" />
                        </label>
                        <label
                          onClick={() => setError(null)}
                          htmlFor="email"
                          className={`flex bg-[#f3f4f4] dark:bg-gray-700 relative z-10 items-center px-5 py-3 rounded-lg group border-2 border-gray-300 dark:border-gray-600 focus-:border-blue-500 gap-1 w-full justify-between dark:focus-within:border-blue-400 focus-within:border-blue-500`}
                        >
                          <input
                            disabled={
                              isFetchingOtp ||
                              isSubmitting ||
                              isSubmissionSuccessful
                            }
                            autoComplete="off"
                            autoCorrect="off"
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => {
                              if (!validateEmail(e.target.value)) {
                                setError("Email is not valid");
                              } else {
                                setEmail(e.target.value);
                                setError(null);
                              }
                            }}
                            required
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
                          className="about w-full relative h-fit"
                        >
                          <textarea
                            disabled={
                              isFetchingOtp ||
                              isSubmitting ||
                              isSubmissionSuccessful
                            }
                            autoCorrect="off"
                            minLength={20}
                            required
                            placeholder="If applying indivudually tell why you need it and if applying for organization, mention the organization details ? (> 20 words)"
                            className="w-full h-20 bg-[#f3f4f4] dark:bg-gray-700 dark:text-neutral-200 rounded-md px-2 py-2 text-xs sm:text-sm md:text-base border-2 border-gray-300 dark:border-gray-600 placeholder:text-xs sm:placeholder:text-sm"
                            name="info"
                            id="info"
                            onChange={(e) => setInfo(e.target.value)}
                          ></textarea>
                        </label>
                        <div className="otp w-full h-fit flex flex-row gap-2 items-center">
                          <label
                            onClick={() => setError(null)}
                            htmlFor="otp"
                            className="w-[70%] h-fit"
                          >
                            <input
                              disabled={
                                isFetchingOtp ||
                                isSubmitting ||
                                isSubmissionSuccessful
                              }
                              autoComplete="off"
                              minLength={6}
                              maxLength={6}
                              type="text"
                              name="otp"
                              id="otp"
                              required
                              placeholder="Enter OTP"
                              className="h-10 w-full bg-[#f3f4f4] dark:bg-gray-700 dark:text-neutral-200 rounded-md px-2 py-2 text-xs sm:text-sm md:text-base border-2 border-gray-300 dark:border-gray-600"
                            />
                          </label>
                          <button
                            onClick={async () => {
                              setIsFetchingOtp(true);
                              await getOtp({
                                userId: email,
                                email: email,
                              });
                              setIsFetchingOtp(false);

                              toast.success("OTP sent successfully 🥳", {
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

                              // Cooldown and wait
                              setIsCooldown(true);
                              setTimer(119); // Set 2-minute cooldown (120 seconds)
                              const countdown = setInterval(() => {
                                setTimer((prev) => {
                                  if (prev <= 1) {
                                    clearInterval(countdown); // Stop the timer
                                    setIsCooldown(false);
                                    return 0;
                                  }
                                  return prev - 1;
                                });
                              }, 1000);
                            }}
                            disabled={
                              isFetchingOtp ||
                              isSubmitting ||
                              isSubmissionSuccessful ||
                              email.length === 0 ||
                              name.length === 0 ||
                              info.length <= 20 ||
                              isCooldown
                            }
                            type="button"
                            className={`h-10 w-24 font-semibold py-2 bg-neutral-700 dark:bg-neutral-600 duration-200  text-white rounded-md flex items-center justify-center gap-1 ${
                              isSubmitting ||
                              isFetchingOtp ||
                              isSubmissionSuccessful ||
                              email.length === 0 ||
                              name.length === 0 ||
                              info.length <= 20 ||
                              isCooldown
                                ? "cursor-not-allowed opacity-60"
                                : "hover:bg-neutral-800 dark:hover:bg-neutral-500"
                            }`}
                          >
                            <span className="text-xs sm:text-sm">
                              {isCooldown
                                ? `${Math.floor(timer / 60)} : ${Math.ceil(
                                    timer % 60
                                  )}`
                                : isFetchingOtp
                                ? "Fetching"
                                : "Get OTP"}
                            </span>
                            {isFetchingOtp && (
                              <SubmissionLoader
                                height={20}
                                width={20}
                                color="pink"
                              />
                            )}
                          </button>
                        </div>
                        <div className="type-radio w-full h-fit flex flex-row gap-4 items-center">
                          <label className="flex items-center">
                            <input
                              defaultChecked
                              type="radio"
                              name="type"
                              value="personal"
                              className="mr-2"
                              required
                            />
                            Personal
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="type"
                              value="organization"
                              className="mr-2"
                            />
                            Organization
                          </label>
                        </div>
                        <div className="flex flex-col items-start gap-2 rounded-md shadow-sm w-full max-w-md">
                          <label
                            htmlFor="logo"
                            className="block text-sm bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                          >
                            Upload Logo (1MB)
                          </label>
                          <input
                            disabled={
                              isFetchingOtp ||
                              isSubmitting ||
                              isSubmissionSuccessful
                            }
                            name="logo"
                            required
                            type="file"
                            id="logo"
                            className="hidden" // Hide the default input
                            accept="image/*"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                if (file.size > 1024 * 1024) {
                                  setError("File size should be less than 1MB");
                                  toast.error(
                                    "File size should be less than 1MB 😔",
                                    {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: false,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                      transition: Bounce,
                                    }
                                  );
                                  setFileName("");
                                  event.target.value = ""; // Reset the input
                                  return;
                                }
                                setError("");
                                setFileName(
                                  file.name.length > 10
                                    ? file.name.substring(0, 10) + "..."
                                    : file.name
                                );
                              } else {
                                setFileName(""); // Reset if no file is selected
                              }
                            }}
                          />
                          {fileName && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              Selected File:{" "}
                              <span className="font-medium">{fileName}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="errors text-xs w-fit h-4 sm:text-sm px-1 font-semibold text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    </div>
                  </div>
                  <div className="register-button">
                    <label htmlFor="" className="w-full ">
                      <button
                        disabled={
                          isSubmitting ||
                          isSubmissionSuccessful ||
                          isFetchingOtp
                        }
                        type="submit"
                        className={`w-full text-center bg-[#3e68b5] dark:bg-[#2357ba]  py-3 rounded-lg flex items-center justify-center gap-2 duration-200 ${
                          isSubmitting ||
                          isSubmissionSuccessful ||
                          isFetchingOtp
                            ? "cursor-not-allowed opacity-60"
                            : "hover:bg-[#2357ba] dark:hover:bg-[#1a4a8d]"
                        }`}
                      >
                        <span className="text-white font-semibold">
                          {isSubmitting
                            ? "Submitting"
                            : isSubmissionSuccessful
                            ? "Success"
                            : "Register"}
                        </span>
                        {isSubmitting && (
                          <SubmissionLoader
                            height={20}
                            width={20}
                            color="pink"
                          />
                        )}
                      </button>
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="bottom-register-links absolute bottom-4 w-fit flex flex-row gap-2 items-center">
              <span className="text-[#727272] dark:text-neutral-400 text-sm">
                Already regsitered?
              </span>
              <span className="text-blue-500 dark:text-blue-400 font-bold text-sm hover:underline duration-200 transition transform">
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

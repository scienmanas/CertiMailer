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
import {
  getOtp,
  handleLogout,
  handleResetPassword,
} from "@/app/lib/controls/auth";
import logo from "@/public/assets/logo/logo.png";

export function ResetPassword(): JSX.Element {
  // Define next router
  const router = useRouter();

  // Submissions
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] =
    useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  // UI enchancements
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  // Top Loader running on every occassions - varibale
  const [startTopLoader, setStartTopLoader] = useState<boolean>(true);
  const [isFetchingOtp, setIsFetchingOtp] = useState<boolean>(false);
  const [Mounted, setMounted] = useState<boolean>(false);

  const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    // Prevent default
    e.preventDefault();

    // start loader & set all errror to null
    toast.info("Reseting password 😁...", {
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
    const ConfirmPassword: string = formData.get("confirmPassword") as string;
    const otp: string = formData.get("otp") as string;

    // Checks
    if (password !== ConfirmPassword) {
      setError("Password does not match");
      setIsSubmitting(false);
      setStartTopLoader(false);
      return;
    }

    const response = await handleResetPassword({
      email: email,
      password: password,
      otp: otp,
    });
    // Reset the loaders
    setIsSubmitting(false);

    if (response.status === 200) {
      // Cookies and redirect
      setIsSubmissionSuccessful(true);
      toast.success("Reset done 🥳", {
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
        router.push("/auth/login");
      }, 3000);
    } else {
      // Show error
      setStartTopLoader(false);
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

  // Delete any existing token
  useEffect(() => {
    const logout = async () => {
      const response = await handleLogout();
      if (response.status === 200) {
        setMounted(true);
        setStartTopLoader(false);
      } else {
        // throw new Error("Unable to logout");
        // router.push("/");
        setMounted(true);
        setStartTopLoader(false);
      }
    };
    logout();
  }, []);

  // Load page only if mouting is done
  if (!Mounted) return <PageLoader />;
  else
    return (
      <div className="w-full h-full flex items-center justify-center dark:bg-gray-900">
        {startTopLoader && <TopLoader />}
        <ToastContainer />
        <div className="form-space relative w-fit flex flex-col items-center gap-14 bg-neutral-50 dark:bg-gray-800 rounded-xl px-7 pt-8 pb-4 sm:pt-10 md:pt-12">
          <div className="head-space w-full items-center justify-center flex flex-col gap-1">
            <Link onClick={() => setStartTopLoader(true)} href={"/"}>
              <Image alt="logo" src={logo} width={100} height={100} />
            </Link>
            <h1 className="font-bold text-xl sm:text-2xl text-neutral-600 dark:text-neutral-200">
              Reset Password
            </h1>
            <p className="w-60 text-sm sm:text-base text-center text-neutral-700 dark:text-neutral-300">
              Forgot your password? No worries, reset it now.
            </p>
          </div>
          <form
            className="flex flex-col w-fit gap-2"
            onSubmit={handleFormSubmission}
          >
            <div className="feild-elements flex flex-col gap-4 w-fit">
              <div className="input-and-error flex flex-col gap-2">
                <div className="input-elements flex flex-col gap-4">
                  <label
                    onClick={() => setError(null)}
                    htmlFor="email"
                    className="flex bg-[#f3f4f4] dark:bg-gray-700 relative z-10 items-center justify-between px-5 py-3 rounded-lg group border-2 border-gray-300 dark:border-gray-600 w-fit focus-within:border-blue-500 dark:focus-within:border-blue-400"
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
                  <label
                    onClick={() => setError(null)}
                    htmlFor="confirmPassword"
                    className={`flex bg-[#f3f4f4] dark:bg-gray-700 relative z-10 items-center px-5 py-3 rounded-lg group border-2 border-gray-300 dark:border-gray-600 focus-:border-blue-500 gap-1 w-fit justify-between focus-within:border-blue-500 dark:focus-within:border-blue-400 ${
                      error ? "border-red-600 dark:border-red-500" : ""
                    } focus-within:border-blue-500`}
                  >
                    <input
                      disabled={isSubmitting || isSubmissionSuccessful}
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      name="confirmPassword"
                      minLength={8}
                      maxLength={15}
                      id="password"
                      value={ConfirmPassword}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        // Update the confirn password
                        setConfirmPassword(event.target.value);
                        setError(null);

                        // Check if the password matches
                        if (
                          password !== event.target.value &&
                          password.length > 0 &&
                          event.target.value.length > 0
                        )
                          setError("Password does not match");
                      }}
                      required
                      className="bg-[#f3f4f4] dark:bg-gray-700 dark:text-neutral-200 outline-none text-sm sm:text-base sm:w-64"
                    />
                    <span
                      className={`absolute text-sm sm:text-base z-20 left-4 bg-[#f3f4f4] dark:bg-gray-700 group-focus-within:-translate-y-6 group-focus-within:scale-90 duration-200 group-focus-within:bg-gradient-to-b group-focus-within:from-[#fafafa] to-[#f3f4f4] dark:group-focus-within:from-[#1f2937] dark:group-focus-within:to-[#374151] group-focus-within:px-1 group-focus-within:-translate-x-1 select-none pointer-events-none  ${
                        ConfirmPassword.length > 0
                          ? "-translate-y-6 scale-90 bg-gradient-to-b dark:from-[#1f2937] dark:to-[#374151] px-1 -translate-x-1 from-[#fafafa] to-[#f3f4f4]"
                          : ""
                      }`}
                    >
                      Confirm Password
                    </span>
                    <button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      type="button"
                      className="dark:text-neutral-200"
                    >
                      {showConfirmPassword ? (
                        <FaEye className="text-base sm:text-lg" />
                      ) : (
                        <FaEyeSlash className="text-base sm:text-lg" />
                      )}
                    </button>
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
                        isCooldown
                      }
                      type="button"
                      className={`h-10 w-[40%] sm:w-[35%] font-semibold py-2 bg-neutral-700 dark:bg-neutral-600 duration-200  text-white rounded-md flex items-center justify-center gap-1 ${
                        isSubmitting ||
                        isFetchingOtp ||
                        isSubmissionSuccessful ||
                        email.length === 0 ||
                        isCooldown
                          ? "cursor-not-allowed opacity-60"
                          : "hover:bg-neutral-800 dark:hover:bg-neutral-500"
                      }`}
                    >
                      <span className="text-xs sm:text-sm">
                        {isCooldown
                          ? `${
                              Math.floor(timer / 60) < 1
                                ? ""
                                : `${Math.floor(timer / 60)}  : `
                            }${Math.ceil(timer % 60)}`
                          : isFetchingOtp
                          ? "Fetching"
                          : "Get OTP"}
                      </span>
                      {isFetchingOtp && (
                        <SubmissionLoader height={20} width={20} color="pink" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="errors text-xs w-fit text-wrap h-4 sm:text-sm px-1 font-semibold text-red-600 dark:text-red-400">
                  {error}
                </div>
              </div>
            </div>
            <div className="reset-password-button">
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
                      ? "Reseting Password"
                      : isSubmissionSuccessful
                      ? "Password Reset"
                      : "Reset Password"}
                  </span>
                  {isSubmitting && (
                    <SubmissionLoader height={20} width={20} color="pink" />
                  )}
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    );
}

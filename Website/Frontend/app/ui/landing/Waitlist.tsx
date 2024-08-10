"use client";

import { useState, useEffect } from "react";
import { Globe } from "@/app/ui/components/globe";
import { WaitListSubmitLoader } from "../loaders";
import { waitListUserFormSubmit } from "@/app/lib/action";
import { SendEmail } from "@/app/lib/action";

export function Waitlist(): JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const designations = ["Student", "Teacher", "Club Head", "Others"];

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    // Get data
    const formData = new FormData(e.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const name: string = formData.get("name") as string;

    // Submit the form
    setIsSubmitting(true);
    await waitListUserFormSubmit(formData);
    setIsSubmitting(false);
    setSubmitted(true);

    // send the email
    const emailParams = {
      to: email,
      subject: "Congratulations, you are added to waitlist !",
      text: `Hola! ${name}.We have successfully added you to our wailtlist with ${email}. You are now in our beta program and there's a lot of crazy stuff coming up and you will be persons who will be given access to our new features\n\nBest Regards,\nTeam CertiMailer.
      `,
      fromName: "No-Reply CertiMailer",
      toName: name,
    };

    await SendEmail(emailParams);
  };

  return (
    <div className="waitlist w-full flex justify-center items-center relative p-8">
      <div className="waitlist-contents w-full flex flex-col flex-wrap lg:flex-row max-w-screen-2xl items-center">
        <div className="waitlist-form justify-between items-center relative w-full lg:w-[40%] flex flex-col gap-5">
          <div className="text flex items-center flex-col gap-6 bg-clip-text text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600 from-neutral-900 to bg-neutral-700">
            <h1 className="font-semibold text-4xl sm:text-">
              Join the waitlist
            </h1>
            <p className="text-base sm:text-lg py-4 px-10 text-center">
              We gonna do the full release it to the waitlist users for testing
              after the entire development is completed. Users will be able to
              manage everything on their own.{" "}
            </p>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-7 px-5 sm:px-10"
          >
            <div className="name-designation-container flex flex-row gap-x-3 sm:gap-x-5">
              <label
                htmlFor="name"
                className="flex flex-col dark:text-neutral-200"
              >
                <span className="text-base">Name</span>
                <input
                  required
                  disabled={submitted}
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-xl w-[9.2rem] h-11 sm:w-44 sm:h-12 p-4 dark:bg-[#27272a] bg-neutral-300 placeholder:text-neutral-800 dark:placeholder:text-neutral-200 border-[2px] dark:border-gray-600 border-gray-600"
                  placeholder="Name"
                />
              </label>
              <label
                htmlFor="designation"
                className="flex flex-col dark:text-neutral-200"
              >
                <span className="text-base">Designation</span>
                <select
                  defaultValue="Select"
                  required
                  disabled={submitted}
                  name="designation"
                  id="designation"
                  className="rounded-xl w-[9.2rem] h-11 p-2 sm:py-0 sm:w-44 sm:h-12 sm:p-4 dark:bg-[#27272a] bg-neutral-300 placeholder:text-neutral-800 dark:placeholder:text-neutral-200 border-[2px] dark:border-gray-600 border-gray-600"
                >
                  <option disabled value="Select">
                    Select
                  </option>
                  {designations.map((designation) => (
                    <option
                      key={designation}
                      value={designation}
                      className="dark:text-neutral-200"
                    >
                      {designation}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label htmlFor="" className="flex flex-col dark:text-neutral-200">
              <span>Email</span>
              <input
                disabled={submitted}
                required
                type="email"
                name="email"
                placeholder="Join our waitlist !"
                className="w-full p-4 rounded-3xl  dark:bg-[#27272a] bg-neutral-300 placeholder:text-neutral-800 dark:placeholder:text-neutral-200 border-[2px] dark:border-gray-600 border-gray-600"
              />
            </label>

            <button
              type="submit"
              disabled={submitted}
              className={`waitlist-button bg-gradient-to-br from-[#9b48e8] to-[#9d7af9]  duration-200 p-4 rounded-xl font-semibold flex items-center justify-center w-full gap-4 ${
                submitted
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-[#6156d4ec] hover:to-[#9d7af9]"
              }`}
            >
              <span className="text-lg text-white">
                {submitted ? "Waitlist Jouned 😇!" : "Join waitlist"}
              </span>

              {isSubmitting && (
                <span className="">
                  <WaitListSubmitLoader />
                </span>
              )}
              <canvas id="my-canvas" className="absolute"></canvas>
            </button>
          </form>
        </div>
        <div className="globe-animation w-full lg:w-[55%] h-fit hidden md:flex">
          <Globe />
        </div>
      </div>
    </div>
  );
}

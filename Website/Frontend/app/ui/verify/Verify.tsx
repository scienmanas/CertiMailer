"use client";

import { firaSansFont } from "@/app/utils/fonts";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Verify(): JSX.Element {
  // To push to different page on button click
  const router = useRouter();
  const [idSubmitted, setIdSubmitted] = useState<boolean>(false);

  return (
    <section
      className={`verify w-full h-fit flex items-center justify-center ${firaSansFont.className}`}
    >
      <div className="content-wrapper w-full max-w-screen-2xl h-fit flex flex-col items-start justify-center gap-6">
        <div className="heading font-semibold text-2xl sm:text-3xl md:text-4xl underline text-black dark:text-white">
          Verify
        </div>
        <div className="description-and-content text-sm sm:text-base w-fit h-fit flex flex-col gap-4">
          <p className="w-fit h-fit text-gray-800 dark:text-gray-200">
            In this page, you can verify your ID/certificate by entering the
            unique ID of your certificate. If your organization or a person has
            issued you an ID/certificate with a unique identifier, you can use
            this page to confirm its authenticity. This system ensures
            transparency and allows you to access all the related details
            securely. If the unique ID is valid, you will see the information
            such as the certificate holder's name, issuing organization, issue
            date, and any additional relevant data. This is particularly useful
            for verifying professional credentials, educational qualifications,
            or any certifications issued for events, workshops, or competitions.
          </p>
          <p className="w-fit h-fit text-gray-800 dark:text-gray-200">
            If you encounter any issues during the verification process or if
            you suspect the ID is invalid, feel free to contact me directly at{" "}
            <span className="underline text-blue-800 dark:text-blue-400 font-semibold">
              manas@certimailer.xyz
            </span>
            . Your feedback is valuable, and I am here to assist you with any
            queries you might have.
          </p>
          <br />
          <p className="w-fit h-fit text-gray-800 dark:text-gray-200 underline">
            Enter your unique id below to verify your certificate
          </p>
        </div>
        <div className="cards flex flex-col w-fit h-fit">
          <div className="card w-full h-fit flex flex-col gap-4">
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                setIdSubmitted(true);
                const formData = new FormData(event.currentTarget);
                const id = formData.get("id") as string;
                router.push(`/verify/${id}`);
              }}
              className="card-content w-full h-fit flex flex-col gap-4"
            >
              <input
                name="id"
                required
                type="text"
                placeholder="Enter your unique ID"
                className="input w-full h-10 px-4 py-2 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
              <button
                className={`button w-[228px] h-10 px-4 py-2 text-white bg-blue-800 dark:bg-blue-600 rounded-lg font-semibold ${
                  idSubmitted
                    ? "cursor-not-allowed opacity-60"
                    : "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                } `}
              >
                {idSubmitted ? "Verifying..." : "Verify ID/Certificate"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

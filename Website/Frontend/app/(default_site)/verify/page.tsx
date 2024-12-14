"use client";

import Image from "next/image";
import logo from "@/public/assets/logo/logo.png";
import { Navbar } from "@/app/ui/universal/Navbar";
import { Footer } from "@/app/ui/universal/Footer";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { FetchedDetails } from "@/app/ui/verify/FetchedDetails";
import { FetchedCertificateDataProps } from "@/app/lib/definitions";
import { FetchDataLoader } from "@/app/ui/loaders";

export default function Verify(): JSX.Element {
  const [fetchedData, setFetchedData] = useState<
    FetchedCertificateDataProps["fetchedData"] | null
  >(null);
  const [isFeteching, setIsFeteching] = useState<boolean>(false);
  const [isFirstFetchDone, setIsFirstFetchDone] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsFeteching(true);
    setIsFirstFetchDone(false);
    setFetchedData(null);

    // API URL
    // const API_URL = "http://localhost:5000/api/certificate/get-info";
    const API_URL = "https://certimailer.onrender.com/api/certificate/get-info";

    // Get the form data
    const formData = new FormData(e.target as HTMLFormElement);
    const _id: string = formData.get("document-id") as string;

    console.log(_id);
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          _id: _id,
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setFetchedData(data);
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    } finally {
      setIsFeteching(false);
      setIsFirstFetchDone(true);
    }
  };

  return (
    <div className="verify-tab w-full flex flex-col items-center h-fit gap-20 dark:bg-gray-800 bg-white no-scrollbar">
      <Navbar />
      <section className="verify-wrapper flex w-full justify-center items-center mt-16 md:mt-0 py-6 px-6 md:py-0 md:mb-0">
        <div className="verify-tab-warpper w-screen max-w-screen-2xl flex flex-col gap-20">
          <div className="heading-and-form flex flex-col gap-10 w-full">
            <div className="head-contents flex items-center justify-start w-fit">
              <Image src={logo} alt="logo" className="w-28 sm:w-40 h-auto" />
              <h1 className="w-fit h-fit text-2xl sm:text-3xl font-bold dark:text-neutral-200 text-neutral-800">
                Verification Panel
              </h1>
            </div>
            <form
              action=""
              className="flex flex-row flex-wrap gap-4 w-fit h-fit p-2"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor=""
                className="flex bg-[#27272a] border-[1px] border-purple-400 rounded-3xl px-4 py-2 flex-row items-center gap-2 hover:border-yellow-300 duration-200"
              >
                <CiSearch className="text-xl dark:text-neutral-200 text-neutral-800" />
                <input
                  required
                  type="text"
                  placeholder="Enter the code !"
                  className="dark:bg-[#27272a] outline-none bg-neutral-300 dark:placeholder:text-neutral-300 dark:text-neutral-300 placeholder:text-neutral-600 text-neutral-900 w-56 h-10"
                  name="document-id"
                />
              </label>
              <button
                type="submit"
                className="text-lg w-fit h-fit px-6 py-3 rounded-xl border-2 border-purple-500 shadow-white font-semibold transition transform duration-200 hover:scale-105 active:scale-95 hover:border-purple-600 dark:text-neutral-200 dark:bg-transparent"
              >
                Get info 🤓
              </button>
            </form>
          </div>
          {isFirstFetchDone && !fetchedData && (
            <div className="404-content w-full flex h-fit items-center justify-center">
              <div className="text-content flex flex-col items-center gap-2">
                <div className="404-text text-4xl sm:text-5xl">
                  <span className="font-bold dark:text-blue-400 text-blue-600 animate-pulse">
                    404{" "}
                  </span>
                  <span>🫠</span>
                </div>
                <span className="font-semibold dark:text-neutral-200 text-center text-base sm:text-xl w-fit sm:w-64">
                  We are sorry, but we truly didn't find anything
                </span>
              </div>
            </div>
          )}
          {isFeteching && (
            <div className="loader w-full h-fit flex items-center justify-center">
              <FetchDataLoader />
            </div>
          )}
          {fetchedData && <FetchedDetails fetchedData={fetchedData} />}
        </div>
      </section>
      <Footer />
    </div>
  );
}

// niche loading laga do dyanmic ke liye

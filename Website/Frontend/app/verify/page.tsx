"use client";

import Image from "next/image";
import logo from "@/public/assets/logo/logo_fig_nobg.png";
import { Navbar } from "@/app/ui/landing/Navbar";
import { Footer } from "@/app/ui/landing/Footer";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { FetchedDetails } from "@/app/ui/verify/FetchedDetails";
import { IdFetchedDataProps } from "@/app/lib/definitions";

export default function Verify(): JSX.Element {
  const [fetchedData, setFetchedData] = useState<
    IdFetchedDataProps["fetchedData"]
  >({
    orgLogo: logo,
    orgName: "Gagan Vedhi",
    orgId: "1234-5678-9012",
    orgStatus: "verified",
    orgEmail: "astronomyclub@iittp.ac.in",
    issuedToName: "Manas Poddar",
    issueId: "1234-5678-9012",
    issuedToEmail: "dumm12345y@person.com",
    issuedDate: "01-01-2021",
    expiryDate: "01-01-2022",
  });

  const handleSubmit = async () => {};

  return (
    <div className="verify-tab w-full flex flex-col items-center h-fit gap-20 dark:bg-gray-800 bg-white">
      <section className="verify-wrapper flex w-full justify-center items-center mt-16 md:mt-0 py-6 px-6 md:py-0 mb-10 md:mb-0">
        <div className="verify-tab-warpper w-screen max-w-screen-2xl flex flex-col gap-14">
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
              //    onSubmit={}
            >
              <label
                htmlFor=""
                className="flex bg-[#27272a] border-[1px] border-purple-400 rounded-3xl px-4 py-2 flex-row items-center gap-2 hover:border-yellow-300 duration-200"
              >
                <CiSearch className="text-xl dark:text-neutral-200 text-neutral-800" />
                <input
                  type="text"
                  placeholder="Enter the code !"
                  className="dark:bg-[#27272a] outline-none bg-neutral-300 dark:placeholder:text-neutral-300 dark:text-neutral-300 placeholder:text-neutral-600 text-neutral-900 w-56 h-10"
                  name="verifytoken"
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
          {fetchedData && <FetchedDetails fetchedData={fetchedData} />}
        </div>
      </section>
      <Footer />
    </div>
  );
}

// niche loading laga do dyanmic ke liye

"use client";

import Image from "next/image";
import { CopyButton } from "@/app/ui/components/copy-button";
import { IdFetchedDataProps } from "@/app/lib/definitions";
import { MdOutlineVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";

export function FetchedDetails({
  fetchedData,
}: IdFetchedDataProps): JSX.Element {
  return (
    <div className="id-query-data-wrapper flex flex-col w-full gap-10">
      <div className="heading text-3xl font-bold decoration-wavy underline text-neutral-800 decoration-yellow-600 dark:text-purple-200 dark:decoration-yellow-200 w-fit h-fit ">
        Fetched Details:
      </div>
      <div className="user-verification-contents flex flex-col w-full gap-6">
        <div className="oragnization-warpper flex flex-col">
          <div className="org-name-and-logo flex items-center gap-2 w-fit h-fit">
            <div className="org-logo p-2">
              <Image
                src={fetchedData.orgLogo}
                alt="org-logo"
                aria-description="organization logo"
                width={100}
                className="h-auto w-"
              />
            </div>
            <div className="org-details-name">
              <span className="org-name font-semibold dark:text-orange-200  text-orange-950 text-xl">
                {fetchedData.orgName}
              </span>
            </div>
          </div>
          <div className="organization-internal-details flex flex-col gap-[1px]">
            <div className="org-id w-fit h-fit flex gap-2">
              <span className="select-none font-semibold dark:text-neutral-200 text-neutral-800">
                Organization Id:
              </span>
              <span className="group flex w-fit h-fit gap-1 items-center">
                <span className="text dark:text-yellow-200 text-purple-950">
                  {fetchedData.orgId}
                </span>
                <div className="copy hidden group-hover:flex">
                  <CopyButton text={fetchedData.orgId} />
                </div>
              </span>
            </div>
            <div className="org-status w-fit h-fit flex flex-row gap-2">
              <div className="select-none font-semibold dark:text-neutral-200 text-neutral-800">
                Status:
              </div>
              <div className="veried-unverified flex flex-row items-center gap-1">
                {fetchedData.orgStatus === "verified" ? (
                  <span className="decoration-dotted decoration-green-200 decoration-1 underline dark:text-pink-100 text-pink-700">
                    verified
                  </span>
                ) : (
                  <span className="decoration-dotted decoration-yellow-200 decoration-1 underline dark:text-pink-100 text-pink-700">
                    unverfied
                  </span>
                )}

                <span className="svg">
                  {true ? (
                    <MdOutlineVerified className="dark:text-green-300 text-green-700" />
                  ) : (
                    <GoUnverified className="dark:text-yellow-300 text-yellow-700" />
                  )}
                </span>
              </div>
            </div>
            <div className="organization-contact w-fit h-fit flex gap-1 items-center group">
              <span className="font-semibold dark:text-neutral-200 text-neutral-800">
                Email:
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-tr dark:from-blue-200 dark:to-pink-400 from-blue-600 to bg-pink-700s">
                {fetchedData.orgEmail}
              </span>
              <div className="copy hidden group-hover:flex">
                <CopyButton text={fetchedData.orgEmail} />
              </div>
            </div>
          </div>
        </div>
        <div className="fecthed details-org-and-id w-fit h-fit flex flex-col gap-4">
          <div className="user-id-information flex flex-col gap-[1px]">
            <div className="person-name flex items-center gap-1">
              <span className="font-semibold dark:text-neutral-200 text-neutral-800">
                Issued to:
              </span>
              <span className="dark:text-purple-100 text-purple-700">
                {fetchedData.issuedToName}
              </span>
            </div>
            <div className="id-number flex gap-1 group items-center">
              <span className="font-semibold dark:text-neutral-200 text-neutral-800">
                Id:
              </span>
              <span className="dark:text-cyan-100 text-cyan-700">
                {fetchedData.issueId}
              </span>
              <span className="copy hidden group-hover:flex">
                <CopyButton text={fetchedData.issueId} />
              </span>
            </div>
            <div className="person-email flex gap-1 group items-center">
              <span className="font-semibold dark:text-neutral-200 text-neutral-800">
                Email:
              </span>
              <span className="dark:text-purple-200 text-purple-700 decoration-dotted underline">
                {fetchedData.issuedToEmail}
              </span>
              <span className="copy hidden group-hover:flex">
                <CopyButton text={fetchedData.issuedToEmail} />
              </span>
            </div>
            <div className="date-issue flex gap-1 items-center">
              <span className="font-semibold dark:text-neutral-200 text-neutral-800">Issued Date:</span>
              <span className="dark:text-green-100 text-green-700">{fetchedData.issuedDate}</span>
            </div>
            <div className="expiry-date flex gap-1 items-center">
              <span className="font-semibold dark:text-neutral-200 text-neutral-800">Expiry:</span>
              <span className="dark:text-yellow-100 text-yellow-700">{fetchedData.expiryDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

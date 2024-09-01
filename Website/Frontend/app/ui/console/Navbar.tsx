import Image from "next/image";
import { SiSololearn } from "react-icons/si";
import Link from "next/link";
import { useState } from "react";
import logo from "@/public/assets/logo/logo_full_no_bg.png";

export function Navbar(): JSX.Element {
  // Implememt function to fetch user image and details

  return (
    <nav className="relative flex w-full h-fit flex-row justify-between items-center">
      <div className="wrapper relative flex w-full h-fit flex-row justify-between px-2 py-[2px] items-center shadow-2xl mb-1 mt-2 mx-2 rounded-md bg-[#3b5975]">
        <div className="logo w-[55px] h-[55px] flex items-center justify-center">
          <Image height={60} width={60} src={logo} alt="logo" />
        </div>
        <div className="relative account-tab cursor-pointer flex flex-row gap-3">
          <div className="learn-tab-redirect-youtube relative flex flex-row items-center">
            <SiSololearn />
          </div>
          <div className="relative z-10 image bg-gray-300 rounded-2xl w-[45px] h-[45px] flex items-center justify-center border-2 border-purple-200 hover:border-purple-600 overflow-hidden">
            <Image
              className="relative z-0 object-cover w-full h-full"
              alt="user-img"
              width={45}
              height={45}
              src={`https://storage.googleapis.com/certimailer/organization_logos/66b74e7a92fba5d474166dcb.png`}
            />
          </div>
          <div className="drop-down"></div>
        </div>
      </div>
    </nav>
  );
}

{
  /* Home having bideo and their things done
documents
templates < coming soon></coming>
nft < coming soon></coming> */
}

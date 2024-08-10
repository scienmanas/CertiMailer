"use client";

import nextjsImgDark from "@/public/assets/made_using/dark/nextjs.png";
import awsImgDark from "@/public/assets/made_using/dark/aws.png";
import tailwindcssSvg from "@/public/assets/made_using/universal/tailwindcss.svg";
import googlecoudImg from "@/public/assets/made_using/universal/googlecloud.png";
import mongodbImg from "@/public/assets/made_using/universal/mongodb.png";
import cloudinaryImg from "@/public/assets/made_using/universal/cloudinary.png";

import nextjsImgLight from "@/public/assets/made_using/light/nextjs.png";
import awsImgLight from "@/public/assets/made_using/light/aws.png";
import { Marquee } from "../components/Marquee";

export function MadeUsingRibbon(): JSX.Element {
  const svgs = [
    nextjsImgDark,
    awsImgDark,
    tailwindcssSvg,
    googlecoudImg,
    mongodbImg,
    cloudinaryImg,
  ];

  return <Marquee svgs={svgs} />;
}

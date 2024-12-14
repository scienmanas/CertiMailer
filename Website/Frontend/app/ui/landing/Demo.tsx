"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useRef } from "react";
import { IoPlayOutline } from "react-icons/io5";
import placeholderImg from "@/public/assets/hero/demo/demo.png";
interface DemoProps {
  img: StaticImageData;
  video: string;
  heading: string;
  description: string;
}

const ImgVideoData: DemoProps = {
  img: placeholderImg,
  video: "/assets/hero/demo/demo.mp4",
  heading: "Demo",
  description: "Watch the demo video now !",
};

export function Demo(): JSX.Element {
  const [isVideoPlayed, setIsVideoPlayed] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-fit flex items-center justify-center">
      <div className="wrapper relative w-full max-w-screen-2xl h-fit flex items-center justify-center">
      <div className="w-fit h-fit highlighted-video flex items-center justify-center">
        <div className="relative highlightedVideo w-fit h-fit flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-16 p-8">
          <div className="head-and-description flex flex-col gap-4 items-center justify-center">
            <h1 className="w-fit h-fit text-center text-transparent bg-clip-text bg-gradient-to-br dark:from-purple-400 from-purple-700 dark:to-purple-200 to-neutral-700 sm:text-lg text-base font-bold ">
              {ImgVideoData.heading}
            </h1>
            <p className="w-fit h-fit text-center sm:text-2xl text-xl text-transparent bg-clip-text bg-gradient-to-tr dark:from-purple-200 dark:to-slate-500 from-neutral-800 to-neutral-900 font-semibold">
              {ImgVideoData.description}
            </p>
          </div>
          <div className="relative video-image-placeholder rounded-xl w-full h-fit before:absolute before:h-[100%] before:w-full before:bg-gradient-radial before:from-purple-500 before:to-purple-800 dark:to-black before:opacity-60 before:blur-2xl before:content-[''] before:right-5 before:-top-5 after:absolute after:h-[100%] after:w-full after:bg-gradient-radial after:from-purple-500 dark:after:to-purple-500 after:to-purple-800 after:blur-2xl after:opacity-60 after:content-[''] after:left-5 after:-bottom-5 after:z-0">
            {!isVideoPlayed && (
              <div className="relative z-10 placehold-image  md:w-[700px] lg:w-[800px] flex items-center justify-center">
                <Image
                  className="w-full relative rounded-xl"
                  src={ImgVideoData.img}
                  alt="placeholder-img"
                />
                <button
                  onClick={() => {
                    setIsVideoPlayed(true);
                    videoRef.current?.play();
                  }}
                  className="absolute z-10 p-4 w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-fit h-fit flex justify-center items-center group bg-[#27272a] rounded-full">
                    <div className="z-0 absolute shadow-pulsing bg-transparent bg-gradient-radial w-[120%] h-[120%] blur-2xl hover:w-[150%] hover:h-[150%] "></div>
                    <IoPlayOutline className=" relative z-10 lg:text-6xl md:text-4xl sm:text-3xl text-2xl border-[2px] border-[#8b5cf6] text-white w-fit h-fit p-4 rounded-full flex items-center justify-center group-hover:scale-105 duration-300 " />
                  </div>
                </button>
              </div>
            )}
            <div
              className={`relative z-10 actual-video w-fit h-fit ${
                isVideoPlayed ? "flex" : "hidden"
              }`}
            >
              <video
                ref={videoRef}
                preload="auto"
                controls
                className="w-[800px] h-auto rounded-lg"
              >
                <source src={ImgVideoData.video} type="video/mp4" />
                {/* <track /> If you have subtitles you can set it */}
              </video>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

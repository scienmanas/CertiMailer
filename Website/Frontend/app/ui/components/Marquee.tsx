import { MarqueeProps } from "@/app/lib/definitions";
import Image from "next/image";

export function Marquee({svgs}: MarqueeProps): JSX.Element {
  return (
    <section className="h-fit py-9 sm:px-7 border-[#52525b99] border-y-[1px] flex flex-row shrink overflow-hidden relative w-full dark:bg-transparent">
      <div className="absolute top-0 h-full bg-gradient-to-r w-[20%] z-10 dark:from-gray-700 from-purple-500 from-20% to-transparent left-0"></div>
      <div className="absolute top-0 h-full bg-gradient-to-l w-[20%] z-10 right-0 dark:from-gray-700 from-purple-500 from-20% to-transparent"></div>
      <div className="marquee-wrapper max-w-[200%] overflow-hidden flex">
          <div className="relative set-1-svg flex flex-row items-center min-w-full justify-around h-fit shrink-0 animate-scroll px-9 gap-9">
            {svgs.map((svg, index) => (
              <Image
                src={svg}
                alt="made_using"
                aria-hidden={true}
                key={index}
                className="select-none pointer-events-none h-10 w-auto"
              />
            ))}
          </div>
          <div className="relative set-1-svg flex flex-row items-center min-w-full justify-around h-fit shrink-0 animate-scroll px-9 gap-9">
            {svgs.map((svg, index) => (
              <Image
                src={svg}
                alt="made_using"
                aria-hidden={true}
                key={index}
                height={40}
                className="select-none pointer-events-none h-10 w-auto"
              />
            ))}
          </div>
      </div>
    </section>
  );
}

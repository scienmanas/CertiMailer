import { MarqueeProps } from "@/app/lib/definitions";

export function Marquee({ svg, text }: MarqueeProps): JSX.Element {
  // Ensure we have at least 5 items by repeating if necessary
  const marqueeItems: MarqueeProps[] = Array(5).fill({ svg, text });

  return (
    <section
      className={`h-fit py-4 sm:px-7 dark:border-[#52525b99] border-[#bbbbbf] border-y-[1px] flex flex-row shrink overflow-hidden relative w-full dark:bg-transparent`}
      aria-label="Scrolling marquee"
    >
      {/* Left gradient overlay */}
      <div
        className="absolute top-0 h-full bg-gradient-to-r w-[20%] z-10 dark:from-gray-800 from-neutral-200 from-20% to-transparent left-0"
        aria-hidden="true"
      />
      {/* Right gradient overlay */}
      <div
        className="absolute top-0 h-full bg-gradient-to-l w-[20%] z-10 right-0 dark:from-gray-800 from-neutral-200 from-20% to-transparent"
        aria-hidden="true"
      />
      {/* Marquee wrapper */}
      <div className="marquee-wrapper max-w-[200%] overflow-hidden flex">
        <div className="relative set-1-svg flex flex-row items-center min-w-full justify-around h-fit shrink-0 animate-scroll gap-4 px-2">
          {marqueeItems.map((item, index) => (
            <div
              key={`marquee-item-1-${index}`}
              className="placeholder flex items-center gap-4
              "
            >
              <item.svg className="dark:text-green-300 text-green-600" aria-hidden="true" />
              <span className="font-mono font-semibold dark:text-pink-500 text-pink-800">{item.text}</span>
              <item.svg className="dark:text-green-300 text-green-600" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="relative set-1-svg flex flex-row items-center min-w-full justify-around h-fit shrink-0 animate-scroll gap-4 px-2">
          {marqueeItems.map((item, index) => (
            <div
              key={`marquee-item-2-${index}`}
              className="placeholder flex items-center gap-4
              "
            >
              <item.svg className="dark:text-green-300 text-green-600" aria-hidden="true" />
              <span className="font-mono font-semibold dark:text-pink-500 text-pink-800">{item.text}</span>
              <item.svg className="dark:text-green-300 text-green-600" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

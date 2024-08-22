import Image from "next/image";
import chatBotImg from "@/public/assets/universal/chatbot.png";

export function ChatBot(): JSX.Element {
  return (
    <div className="fixed z-40 text-white bottom-0 right-0 p-4">
      <div className="relative not-open-showup cursor-pointer w-fit h-fit flex items-center justify-center group">
        <div className="absolute dark:text-neutral-400 text-sm -top-10 hidden group-hover:flex duration-200 items-center place-self-center text-nowrap px-2 py-1 bg-gray-700 rounded-md">
          Soon
        </div>
        <svg
          className="absolute left-0 w-full h-2 text-xl text-slate-900/75 hidden group-hover:flex dark:text-slate-700/90 -top-[12px]"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon
            className="fill-current"
            points="0,0 127.5,127.5 255,0"
          ></polygon>
        </svg>
        <Image
          src={chatBotImg}
          alt="chatbot"
          width={60}
          height={60}
          className="ping-circle pointer-events-none"
        />
      </div>
    </div>
  );
}

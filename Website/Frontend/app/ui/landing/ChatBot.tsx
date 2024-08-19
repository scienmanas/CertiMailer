import Image from "next/image";
import chatBotImg from "@/public/assets/universal/chatbot.png";

export function ChatBot(): JSX.Element {
  return (
    <div className="fixed z-40 text-white bottom-0 right-0 p-4">
      <div className="relative not-open-showup cursor-pointer w-fit h-fit flex items-center justify-center">
        <div className="absolute dark:text-neutral-400 text-sm -top-10 flex items-center place-self-center text-nowrap px-2 py-1 bg-gray-700 rounded-md">Soon</div>
        <Image
          src={chatBotImg}
          alt="chatbot"
          width={65}
          height={65}
          className="ping-circle"
        />
      </div>
    </div>
  );
}

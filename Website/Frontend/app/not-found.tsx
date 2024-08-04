import Link from "next/link";
import logo from "@/public/assets/logo/logo_fig_nobg.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="not-found w-full h-screen flex justify-center items-center flex-col gap-4 dark:bg-gray-800 bg-white">
      <div className="logo-and-code flex flex-row items-center gap-1 flex-wrap">
        <Image src={logo} alt="logo" className="w-40 h-auto" />
        <div className="text text-7xl dark:text-blue-500 text-blue-500 font-bold animate-pulse">
          404
        </div>
      </div>
      <div className="text-more">
        <p className="w-fit h-fit text-xl dark:text-neutral-200 text-neutral-900">
          Hmm 🤔, we couldn't find this page.
        </p>
      </div>
      <Link href={`/`}>
        <button className="text-lg font-semibold border-2 px-6 py-3 border-purple-400 rounded-3xl bg-[#293041] shadow-md shadow-white transition transform duration-200 hover:scale-105 active:scale-95 dark:text-neutral-200 text-neutral-900">
          Go to Home 🏠
        </button>
      </Link>
    </div>
  );
}

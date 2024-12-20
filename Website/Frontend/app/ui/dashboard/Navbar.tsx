import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/assets/logo/logo.png";
import { SiBuymeacoffee } from "react-icons/si";

export function Navbar({ userLogoUrl }: { userLogoUrl: string }): JSX.Element {
  // Implememt function to fetch user image and details

  return (
    <nav className="relative flex w-full h-fit flex-row justify-between items-center">
      <div className="wrapper relative flex w-full h-fit flex-row justify-between px-2 py-[2px] items-center shadow-2xl bg-neutral-800 ">
        <div className="logo w-fit h-fit flex items-center justify-center">
          <Link href={"/"}>
            <Image height={40} width={40} src={logoImg} alt="logo" />
          </Link>
        </div>
        <div className="relative account-tab cursor-pointer flex flex-row gap-2 items-center">
          <div className="bmc">
            <SiBuymeacoffee className="text-2xl text-white" />
          </div>
          <div className="profile-photo">
            <Image
              src={userLogoUrl}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

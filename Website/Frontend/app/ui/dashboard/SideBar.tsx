"use client";

import { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { PiCertificateDuotone } from "react-icons/pi";
import { SiFuturelearn } from "react-icons/si";
import { VscIssues } from "react-icons/vsc";
import { LuLogOut } from "react-icons/lu";
import { FiActivity } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/app/lib/controls/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";

export function SideBar(): JSX.Element {
  // Router for navigating & Path fetching
  const router = useRouter();
  const pathName = usePathname();

  // UI enhancements
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const items = [
    { Icon: FaHome, label: "Home", link: "/dashboard" },
    {
      Icon: PiCertificateDuotone,
      label: "Generate",
      link: "/dashboard/generate",
    },
    { Icon: FiActivity, label: "Activity", link: "/dashboard/activity" },
    { Icon: SiFuturelearn, label: "Learn", link: "/dashboard/learn" },
    { Icon: VscIssues, label: "Issues", link: "/dashboard/issues" },
  ];

  // Update the current tab
  useEffect(() => {
    const activeIndex = items.findIndex((item) => item.link === pathName);
    if (activeIndex !== -1) {
      setCurrentTab(activeIndex);
      setHoveredIndex(activeIndex);
    }
  }, [pathName]);

  return (
    <section className="side-bar h-full p-2">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="side-bar-wrapper px-2 h-full flex flex-col justify-between bg-transparent bg-gradient-to-br from-[#385c7d] to-[#834358] rounded-md py-2">
        <div className="controls w-fit h-fit relative">
          <ul className="relative top-0 items flex flex-col gap-2 w-fit h-fit items-center">
            <div
              style={{
                transform: `${
                  currentTab !== 0
                    ? `translateY(calc(${
                        8 * currentTab
                      }px + 100% * ${currentTab}))`
                    : "translateY(0)"
                }`,
                transition: `transform 0.3s ease`,
              }}
              className="moving-bar-current-tab absolute z-10 bg-transparent bg-gradient-to-br  to-[#47749e] from-[#bc6b84] w-12 sm:w-14 h-12 sm:h-14 rounded blur-background shadow-2xl shadow-pink-700"
            ></div>

            <div
              style={{
                transform: `${
                  hoveredIndex !== 0
                    ? `translateY(calc(${
                        8 * hoveredIndex
                      }px + 100% * ${hoveredIndex}))`
                    : "translateY(0)"
                }`,
                transition: `transform 0.3s ease`,
              }}
              className="moving-bar-with-user top-0 absolute z-10 bg-transparent bg-gradient-to-br  to-[#47749e] from-[#bc6b84] w-12 sm:w-14 h-12 sm:h-14 rounded blur-background shadow-2xl shadow-pink-700 opacity-35"
            ></div>

            {items.map((item, index) => (
              <li
                onClick={() => {
                  router.push(item.link);
                  setCurrentTab(index);
                }}
                key={index}
                className="flex items-center justify-center rounded-lg relative cursor-pointer h-12 sm:h-14 "
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(currentTab)}
              >
                <button
                  className="relative z-20 flex flex-col items-center w-full h-fit gap-1 p-1"
                  // onClick={}
                >
                  <span className="text-white">
                    <item.Icon className="text-lg sm:text-2xl" />
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-pink-400 font-bold">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="setting-and-loggin-out flex gap-1 flex-col">
          {/* <div className="setting flex gap-1 group flex-col  items-center">
            <span className="">
              <IoSettingsOutline className="text-lg sm:text-2xl text-white" />
            </span>
            <span className="text-[9px] sm:text-[11px] text-pink-400 font-bold">
              Settings
            </span>
          </div> */}
          <button
            type="button"
            onClick={async () => {
              toast.info("Logging you out", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
              // Start logout
              const response = await handleLogout();
              if (response.status === 200) {
                toast.success("Logged out successfully", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
                router.push("/");
              } else
                toast.error("Logout failed", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
            }}
            className="logout flex gap-1 group  flex-col items-center"
          >
            <span className="">
              <LuLogOut className="text-lg sm:text-2xl text-white" />
            </span>
            <span className="text-[9px] sm:text-[11px] text-pink-400 font-bold">
              Logout
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

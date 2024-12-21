"use client";

import { getUserData } from "@/app/lib/controls/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { firaSansFont } from "@/app/utils/fonts";
import Image from "next/image";

// User data interface
interface userDataType {
  name: string;
  email: string;
  logoUrl: string;
  status: string;
  type: string;
  maxAllocatedEvents: number;
  totalEvents: number;
  AllocatedEmails: number;
  date: Date;
  about: string;
}

// Skeleton Component
function DashBoardSkeleton(): JSX.Element {
  return (
    <div className="animate-pulse space-y-6 w-full">
      <div className="flex items-start space-x-4 p-4 bg-gray-100 rounded-md shadow">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-16 w-full bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Data Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-24 bg-gray-300 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}

// Filled Component
function DashBoardFilled({
  userData,
}: {
  userData: userDataType;
}): JSX.Element {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(userData.date));

  // Account type emoji mapping
  const accountTypeEmoji = userData.type === "Personal" ? "👤" : "🏢";

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 h-fit">
      <div className="flex items-start space-x-2 sm:space-x-4 md:space-x-6 p-3 sm:p-4 md:p-6 bg-white rounded-md shadow-md w-full h-fit">
        <Image
          width={80}
          height={80}
          src={userData.logoUrl}
          alt="User Logo"
          className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover"
        />

        <div className="flex flex-col flex-wrap w-full">
          <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-black gap-2 flex items-center">
            <span>{userData.name}</span>
            <span
              className={`px-3 py-1 rounded-md text-xs sm:text-sm md:text-base ${
                userData.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {userData.status}
            </span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            {userData.email}
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-gray-700 text-xs sm:text-sm md:text-base">
              <strong className="underline">Joined:</strong> {formattedDate}
            </span>
          </div>
          <p className="text-gray-600 text-wrap text-xs sm:text-sm md:text-base">
            <strong className="underline">About:</strong>{" "}
            <span>{userData.about}</span>
          </p>
        </div>
      </div>

      {/* Account Type with Emoji */}
      <div className="p-3 sm:p-4 bg-white rounded-md shadow-md">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-black">
          Account Type {accountTypeEmoji}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base">
          {userData.type}
        </p>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-md shadow-md">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-black">
            Max Allocated Events
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            {userData.maxAllocatedEvents}
          </p>
        </div>
        <div className="p-4 bg-white rounded-md shadow-md">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-black">
            Total Events
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            {userData.totalEvents}
          </p>
        </div>
        <div className="p-4 bg-white rounded-md shadow-md">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-black">
            Allocated Emails Per Event
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            {userData.AllocatedEmails}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashBoard(): JSX.Element {
  const router = useRouter();
  const [userData, setUserData] = useState<null | userDataType>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  document.title = "Dashboard | CertiMailer";

  useEffect(() => {
    const checkCredentials = async () => {
      const response = await getUserData();

      if (response.status === 500) {
        router.push("/");
      } else if (response.status === 200) {
        setUserData({
          name: response.userData.name,
          email: response.userData.email,
          logoUrl: response.userData.logoUrl,
          status: response.userData.status,
          type: response.userData.type,
          maxAllocatedEvents: response.userData.maxAllocatedEvents,
          totalEvents: response.userData.totalEvents,
          AllocatedEmails: response.userData.AllocatedEmails,
          date: new Date(response.userData.date),
          about: response.userData.about,
        });
        setMounted(true);
      } else {
        router.push("/auth/login");
      }
    };

    checkCredentials();
  }, [router]);

  return (
    <div
      className={`w-full h-full flex items-center justify-start px-1 py-4 sm:p-4 md:p-6 ${firaSansFont.className}`}
    >
      <div className="wrapper w-full h-full max-w-screen-xl flex items-start flex-col gap-4 md:gap-6 overflow-y-auto">
        <div className="heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-black">
          Profile ✨
        </div>
        {mounted ? (
          <DashBoardFilled userData={userData!} />
        ) : (
          <DashBoardSkeleton />
        )}
      </div>
    </div>
  );
}

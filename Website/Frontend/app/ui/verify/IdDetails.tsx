"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaCertificate,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { PiIdentificationBadgeBold } from "react-icons/pi";
import { PageLoader, IdNotFound } from "@/app/ui/loaders";
import { useRouter } from "next/navigation";
import { getIdDetails } from "@/app/lib/controls/id";
import { Navbar } from "@/app/ui/universal/Navbar";
import { Footer } from "@/app/ui/universal/Footer";
import Image from "next/image";
import { firaSansFont } from "@/app/utils/fonts";
import Link from "next/link";
import { Fragment } from "react";
import { toPng } from "html-to-image";

export default function IdDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.slug as string; // Access the dynamic slug
  const boxRef = useRef<HTMLDivElement>(null); // For screenshot of the card
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleBoxDownload = async () => {
    if (boxRef.current) {
      // Create a tempporary wrapper element
      setIsDownloading(true);
      const wrapper = document.createElement("div");
      wrapper.style.padding = "50px";
      wrapper.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
      wrapper.style.display = "inline-block";
      wrapper.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
      wrapper.appendChild(boxRef.current.cloneNode(true));

      // Append the wrapper to the body
      document.body.appendChild(wrapper);

      const options = {
        canvasWidth: wrapper.offsetWidth,
        canvasHeight: wrapper.offsetHeight,
      };

      try {
        const dataUrl = await toPng(wrapper, options);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "id.png";
        link.click();
      } catch (error) {
        console.error("Failed to download image:", error);
      } finally {
        // Clean up the wrapper
        document.body.removeChild(wrapper);
        setIsDownloading(false);
      }
    }
  };

  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingSuccessful, setIsFetchingSuccessful] =
    useState<boolean>(false);
  const [idData, setIdData] = useState<null | {
    user: {
      issuedTo: string;
      issuedEmail: string;
    };
    id: {
      _id: string;
      issuedDate: string;
      expiryDate: string;
      idType: string;
    };
    event: {
      eventId: string;
      eventName: string;
      eventType: string;
      eventDate: string;
    };

    organization: {
      organizationName: string;
      organizationId: string;
      organizationLogo: string;
      organizationEmail: string;
      organizationAbout: string;
      organizationStatus: string;
      organizationWebsite?: string;
    };
  }>(null);

  useEffect(() => {
    // For any reason, if the id is not present, redirect to 404 page
    if (!id) {
      router.push("/not-found");
      return;
    }
    const fetchIdData = async () => {
      const response = await getIdDetails({ id: id });
      if (response.status === 200) {
        // Assign data to the variables
        // setIdData({
        //   id: {
        //     _id: response.data.id._id,
        //     issuedDate: response.data.id.issuedDate,
        //     idType: response.data.id.idType,
        //     expiryDate: response.data.id.expiryDate,
        //   },
        //   event: {
        //     eventId: response.data.event.eventId,
        //     eventName: response.data.event.eventName,
        //     eventType: response.data.event.eventType,
        //     eventDate: response.data.event.eventDate,
        //   },
        //   user: {
        //     issuedTo: response.data.user.issuedTo,
        //     issuedEmail: response.data.user.issuedEmail,
        //   },
        //   organization: {
        //     organizationName: response.data.organization.organizationName,
        //     organizationId: response.data.organization.organizationId,
        //     organizationLogo: response.data.organization.organizationLogo,
        //     organizationAbout: response.data.organization.organizationAbout,
        //     organizationStatus: response.data.organization.organizationStatus,
        //     organizationWebsite:
        //       response.data.organization?.organizationWebiste,
        //   },
        // });

        setIsFetchingSuccessful(true);
        setIsFetching(false);
      } else {
        setIsFetchingSuccessful(false);
        setIsFetching(false);
      }
    };
    // fetchIdData();

    // setIdData({
    //   user: {
    //     issuedTo: "Manas Poddar",
    //     issuedEmail: "manas@example.com",
    //   },
    //   id: {
    //     _id: "123456",
    //     issuedDate: "22 July 2024",
    //     expiryDate: "23 July 2024",
    //     idType: "Participant",
    //   },
    //   event: {
    //     eventId: "event123",
    //     eventName: "MediHacks 2024",
    //     eventType: "Hackathon",
    //     eventDate: "2024-07-07",
    //   },
    //   organization: {
    //     organizationName: "MediHacks",
    //     organizationId: "org123",
    //     organizationEmail: "manas@certimailer.xyz",
    //     organizationLogo:
    //       "https://storage.googleapis.com/certimailer/676435f2b91236d1bd7ec819/logo/logo.png",
    //     organizationAbout:
    //       "Hackathon dedicated to push innovation in society by fusing AI with medicine.",
    //     organizationStatus: "unverified",
    //     organizationWebsite: "https://medihacks.com",
    //   },
    // });
    // setIsFetchingSuccessful(true);
    setIsFetching(false);
  }, [id, router]);

  if (isFetching) return <PageLoader />;
  else if (!isFetchingSuccessful) return <IdNotFound />;
  else if (idData === null) return <IdNotFound />;
  else
    return (
      <section
        className={`id-page w-full h-fit flex flex-col gap-6 sm:gap-10 ${firaSansFont.className}`}
      >
        <div className="Navbar w-full h-fit">
          <Navbar />
        </div>
        <div className="details w-full h-fit flex items-center justify-center">
          <div className="wrapper-full max-w-screen-2xl h-fit flex items-start justify-center px-4 py-10 flex-col gap-10">
            <div
              ref={boxRef}
              className="box-container-content border dark:border-gray-700 rounded-lg shadow-lg dark:shadow-neutral-700 p-6 flex flex-col gap-6 bg-[#f2f2f2] dark:bg-[#1e2835] "
            >
              <div className="org-details-top flex items-center flex-row gap-2">
                <Image
                  width={60}
                  height={60}
                  src={idData.organization.organizationLogo}
                  alt={`orgLogo`}
                  className="w-[60px] h-[60px] rounded-full object-cover bg-black text-xs"
                />
                <div className="org-name-and-status flex flex-col">
                  <h1 className="text-2xl font-semibold">
                    {idData.organization.organizationName}
                  </h1>
                  <span
                    className={`text-xs w-fit h-fit px-2 py-1 rounded-md bg-opacity-80 font-semibold ${
                      idData.organization.organizationStatus === "verified"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {idData.organization.organizationStatus}
                  </span>
                </div>
              </div>

              <div className="id-and-other-details flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <div className="w-fit h-fit flex items-center">
                    <FaUser className="text-blue-500 inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">Name:</span>{" "}
                      <Link
                        className="hover:underline dark:decoration-cyan-400 decoration-blue-700"
                        target="_blank"
                        href={`mailto:${idData.user.issuedEmail}`}
                      >
                        {idData.user.issuedTo}
                      </Link>
                    </div>
                  </div>
                  <div className="w-fit h-fit flex items-center">
                    <FaCertificate className="text-green-500 inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">Certificate Type:</span>{" "}
                      {idData.id.idType}
                    </div>
                  </div>
                  <div className="w-fit h-fit flex items-center">
                    <FaBuilding className="text-yellow-500 inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">Event Name:</span>{" "}
                      {idData.event.eventName}
                    </div>
                  </div>
                  <div className="w-fit h-fit flex items-center">
                    <FaCalendarAlt className="text-purple-500 inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">Event Date:</span>{" "}
                      {idData.event.eventDate}
                    </div>
                  </div>
                  <div className="w-fit h-fit flex items-center">
                    <FaCalendarAlt className="text-red-500 inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">Start Date:</span>{" "}
                      {idData.id.issuedDate}
                    </div>
                  </div>
                  <div className="w-fit h-fit flex items-center">
                    <FaCalendarAlt className="text-indigo-500 inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">End Date:</span>{" "}
                      {idData.id.expiryDate}
                    </div>
                  </div>
                  <div className="w-fit h-fit flex items-center">
                    <PiIdentificationBadgeBold className="text-pink-500 text-lg inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">Id:</span> {idData.id._id}
                    </div>
                  </div>
                  <div className="w-fit h-fit flex items-center">
                    <HiOutlineIdentification className="text-purple-500 text-lg inline-block mr-2" />
                    <div className="data-text w-fit h-fit">
                      <span className="font-semibold">Org Id:</span>{" "}
                      {idData.organization.organizationId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-organization w-fit h-fit">
                <h2 className="text-lg font-semibold text-black dark:text-neutral-100">
                  About Organization
                </h2>
                <p className="text-gray-700 dark:text-neutral-400 w-fit h-fit">
                  {idData.organization.organizationAbout}
                </p>
              </div>

              <div className="org-website-and-email w-fit h-fit flex flex-row gap-2">
                {idData.organization.organizationWebsite ? (
                  <Fragment>
                    <Link
                      href={idData.organization.organizationWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website text-blue-500 dark:text-cyan-300 underline w-fit h-fit"
                    >
                      Visit Website
                    </Link>
                    <span> | </span>
                  </Fragment>
                ) : null}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="email text-blue-500 dark:text-cyan-300 underline w-fit h-fit"
                  href={`mailto:${idData.organization.organizationEmail}`}
                >
                  Email
                </Link>
              </div>
            </div>
            <div className="download-button flex flex-row flex-wrap gap-2">
              <button
                onClick={handleBoxDownload}
                type="button"
                className={`button w-[145px] h-10 px-4 py-2 text-white bg-blue-800 dark:bg-blue-600 rounded-lg font-semibold focus:outline-none focus:ring-2 text-center ${
                  isDownloading
                    ? "cursor-not-allowed opacity-60"
                    : "focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                }`}
              >
                {isDownloading ? "Downloading..." : "Download card"}
              </button>
              <button
                onClick={handleBoxDownload}
                type="button"
                className={`button w-[145px] h-10 px-4 py-2 text-white bg-blue-800 dark:bg-blue-600 rounded-lg font-semibold focus:outline-none focus:ring-2 text-center ${
                  isDownloading
                    ? "cursor-not-allowed opacity-60"
                    : "focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                }`}
              >
                {isDownloading ? "Downloading..." : "Download Id"}
              </button>
            </div>
          </div>
        </div>
        <div className="footer w-full h-fit">
          <Footer />
        </div>
      </section>
    );
}

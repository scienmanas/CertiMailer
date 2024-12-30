"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, File } from "lucide-react";
import Papa from "papaparse";
import { TopLoader, SubmissionLoader } from "@/app/ui/loaders";
import { generateLimitedId } from "@/app/lib/controls/id";
import { getUserData } from "@/app/lib/controls/user";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Point {
  xPercent: number;
  yPercent: number;
  field: string;
}

interface FieldMapping {
  name: string;
  mapping: string;
  point?: Point;
}

interface csvData {
  headers: string[];
  rows: any[][];
  hasMore: boolean;
}

// Constant values
const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB in bytes
const MAX_ROWS = 400;
const FONT_FAMILIES = ["Arial", "Times New Roman", "Courier", "Fira Sans"];
const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32];

export function Generate(): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | {
    totalEvents: number;
    maxAllocatedEvents: number;
    AllocatedEmails: number;
  }>(null);

  const [csvData, setCsvData] = useState<csvData | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<FieldMapping[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [fontColor, setFontColor] = useState<string>("#000000");
  const [eventExpiry, setEventExpiry] = useState<boolean>(false);
  const [Mailing, setMailing] = useState<boolean>(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCsvData(null);
    setError(null); // Reset the error
    setMailing(true);

    try {
      const file = event.target.files?.[0];
      if (!file) return;
      // Validate the type of file
      const fileExtension = file.name.split(".").pop()?.toLocaleLowerCase();
      if (fileExtension !== "csv") {
        toast.error("Please upload a CSV file");
        setError("Please upload a CSV file");
        event.target.value = ""; // Reset the input
        return;
      }

      // Start parsing
      Papa.parse(file, {
        complete: (results) => {
          if (results.data.length < 2) {
            setError("CSV file must contain at least headers and one data row");
            toast.error("At least one data row is required");
            event.target.value = ""; // Reset the input
            return;
          }

          // Check if the number of rows is within limits
          if (results.data.length > MAX_ROWS) {
            setError(
              `CSV file contains more than ${MAX_ROWS} rows. Please upload a smaller file rows < 400.`
            );
            toast.error("Too many rows in the file (limit - 400)");
            event.target.value = ""; // Reset the input
            return;
          }

          // Get all the headers and rows
          const headers = results.data[0] as string[];
          // Perform checks on name and email
          if (headers[0].toLocaleLowerCase() !== "name") {
            setError("First column must be 'Name'");
            toast.error("First column must be 'Name'");
            event.target.value = ""; // Reset the input
            return;
          }
          if (headers[1].toLocaleLowerCase() !== "email") {
            setError("Second column must be 'Email'");
            toast.error("Second column must be 'Email'");
            event.target.value = ""; // Reset the input
            return;
          }

          // Pause mailing if limit is exceded
          if (userData) {
            if (results.data.length > userData.AllocatedEmails) {
              setMailing(false);
              toast.error("Mailing will be paused due to limit");
            } else {
              setMailing(true);
            }
          }

          const rows = results.data.slice(1) as string[][];
          const parsedData: csvData = {
            headers,
            rows: rows.slice(0, 10), // Slice to 10
            hasMore: rows.length > 10, // indicate of more rows are present
          };
          setCsvData(parsedData); // Set the data

          // Update mapping fields
          const mappingFields = headers
            .filter((_, index) => index !== 1) // Exclude email
            .map((header) => ({
              name: header,
              mapping: header,
            }));
          setFields(mappingFields);
          setError(null); // Reset the error
        },
        error: (error) => {
          setError(`Error parsing CSV: ${error.message}`);
          event.target.value = ""; // Reset the input
          toast.error("Error parsing CSV");
        },
        header: false,
        skipEmptyLines: true,
        comments: "#",
        dynamicTyping: true,
        worker: true,
      });
    } catch (error) {
      const errorMessage = "Error reading file. Please try again.";
      setError(errorMessage);
      event.target.value = ""; // Reset the input
    }
  };

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null); // Reset the error
    setTemplate(null);

    const file = event.target.files?.[0];
    if (!file) return;
    // Validate the type of file
    if (!file.type.startsWith("image/")) {
      setError("Please upload only image files");
      event.target.value = ""; // Reset the input
      toast.error("Please upload only image files");
      return;
    }

    // Validate size of the image
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image size is too large. Please upload a image < 1MB.");
      event.target.value = ""; // Reset the input
      toast.error("Image size is too large. Please upload a image < 1MB.");
      return;
    }

    // Read and set as template
    const image = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      image.src = e.target.result as string;

      image.onload = () => {
        const originalWidth = image.width;
        const orginalHeight = image.height;
        // Calculate the aspect ration
        const aspectRatio = originalWidth / orginalHeight;
        // Limit the dimension
        const maxDimension = 1000;
        let newWidth, newHeight;
        if (originalWidth > orginalHeight) {
          newWidth = maxDimension;
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = maxDimension;
          newWidth = newHeight * aspectRatio;
        }

        setTemplate(e.target?.result as string);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setError(null); // Reset the error

    if (!selectedField || !imageRef.current) return; // Check if field is selected

    const rect = imageRef.current.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    // Set the point for the selected field
    setFields(
      fields.map((field) => {
        if (field.name === selectedField) {
          return {
            ...field,
            point: {
              xPercent: xPercent,
              yPercent: yPercent,
              field: field.name,
            },
          };
        }
        return field;
      })
    );
    setSelectedField(null); // Reset the selected field after the click is done to prevent multiple clicks
  };

  // Handle data submission
  const handleSubmission: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setIsGenerating(true);
    setError(null); // Reset the error

    // Check if the event is exceding the limit
    if (userData && userData.totalEvents >= userData.maxAllocatedEvents) {
      setError("You have reached the maximum event limit");
      toast.error("You have reached the maximum event limit");
      setIsGenerating(false);
      return;
    }

    // Check if all the required data is present
    if (!csvData || !template || !fields || !fontSize || !fontFamily || !fields)
      return setError("Please upload CSV and template and map the fields");

    // Validate if all the fields are there
    const missingFields = fields.filter((field) => !field.point);
    if (missingFields.length > 0) {
      setError(
        `Please set the position for the following fields: ${missingFields
          .map((field) => field.name)
          .join(", ")}`
      );
      toast.error(
        `Please set the position for the following fields: ${missingFields
          .map((field) => field.name)
          .join(", ")}`
      );
      setIsGenerating(false);
      return;
    }

    // Embed rest of the data
    const formData = new FormData(event.target as HTMLFormElement);

    // Add the other fields
    formData.append("fields", JSON.stringify(fields));
    formData.append("fontFamily", fontFamily);
    formData.append("fontSize", fontSize.toString());

    // Generate the Ids
    toast.info("Started generating IDs 🚀");
    const response = await generateLimitedId(formData);
    if (response.status === 200) {
      setDownloadBlob(response.blob as Blob);
      toast.success("Generated, do download 🥳");
    } else {
      setError("Error generating IDs 🫠");
      toast.error(response.message);
    }

    // Reset the state
    formRef.current?.reset();
    setCsvData(null);
    setTemplate(null);
    setFields([]);
    setFontColor("#000000");
    setFontSize(16);
    setMailing(true);
    setIsGenerating(false);
    setEventExpiry(false);
  };

  // Fetch user data to limit the number of events generation
  useEffect(() => {
    const checkCredentials = async () => {
      const response = await getUserData();
      if (response.status === 500) {
        toast.error("Internal Server Error");
        router.push("/");
      } else if (response.status === 200) {
        setUserData({
          totalEvents: response.userData.totalEvents,
          maxAllocatedEvents: response.userData.maxAllocatedEvents,
          AllocatedEmails: response.userData.AllocatedEmails,
        });
        if (
          response.userData.totalEvents >= response.userData.maxAllocatedEvents
        ) {
          toast.error("You have reached the maximum event limit");
        }
        setMounted(true);
      } else {
        toast.error("Unauthorized Access");
        router.push("/");
      }
    };
    checkCredentials();
  }, [router]);

  if (!mounted) return <TopLoader />;
  else
    return (
      <div className="generate-container w-full h-fit overflow-scroll">
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
        <form
          ref={formRef}
          onSubmit={handleSubmission}
          className="wrapped-function-container w-full p-2 flex flex-col gap-10"
        >
          {/* Details about the event */}
          <div className="event-details w-fit h-fit flex flex-col gap-4 flex-wrap items-start">
            <div className="event-details-wrapper w-fit h-fit flex flex-row gap-4 flex-wrap items-center">
              <label className="relative event-name" htmlFor="eventName">
                <input
                  id="eventName"
                  type="text"
                  name="eventName"
                  placeholder="Event Name"
                  required
                  className="p-2 border-2 border-gray-300 dark:border-gray-500 hover:border-blue-600 focus:border-blue-600 dark:hover:border-blue-500 dark:focus:border-blue-500 duration-200 outline-none rounded-md w-fit"
                />
                <span className="placeholder absolute z-20 top-0 left-0 translate-x-2 text-sm -translate-y-[9px] px-[3px] w-fit h-fit duration-100 bg-transparent bg-gradient-to-b from-[#eaeaea] to-white dark:from-[#1a2029] dark:to-[#2b2a33] font-mono text-neutral-800 dark:text-neutral-100">
                  Event
                </span>
              </label>
              <label className="relative event-date" htmlFor="eventDate">
                <input
                  required
                  className="p-2 border-2 border-gray-300 dark:border-gray-500 hover:border-blue-600 focus:border-blue-600 dark:hover:border-blue-500 dark:focus:border-blue-500 duration-200 outline-none rounded-md w-fit"
                  type="date"
                  name="eventDate"
                  id="eventDate"
                />
                <span className="placeholder absolute z-20 top-0 left-0 translate-x-2 text-sm -translate-y-[9px] px-[3px] w-fit h-fit duration-100 bg-transparent bg-gradient-to-b from-[#eaeaea] to-white dark:from-[#1a2029] dark:to-[#2b2a33] font-mono text-neutral-800 dark:text-neutral-100">
                  Date
                </span>
              </label>
              <label className="relative event-type" htmlFor="eventType">
                <input
                  id="eventType"
                  type="text"
                  name="eventType"
                  placeholder="Event Type"
                  required
                  className="p-2 border-2 border-gray-300 dark:border-gray-500 hover:border-blue-600 focus:border-blue-600 dark:hover:border-blue-500 dark:focus:border-blue-500 duration-200 outline-none rounded-md w-fit"
                />
                <span className="placeholder absolute z-20 top-0 left-0 translate-x-2 text-sm -translate-y-[9px] px-[3px] w-fit h-fit duration-100 bg-transparent bg-gradient-to-b from-[#eaeaea] to-white dark:from-[#1a2029] dark:to-[#2b2a33] font-mono text-neutral-800 dark:text-neutral-100">
                  Type
                </span>
              </label>
              <label className="relative id-type" htmlFor="idType">
                <input
                  id="idType"
                  type="text"
                  name="idType"
                  placeholder="ID Type"
                  required
                  className="p-2 border-2 border-gray-300 dark:border-gray-500 hover:border-blue-600 focus:border-blue-600 dark:hover:border-blue-500 dark:focus:border-blue-500 duration-200 outline-none rounded-md w-fit"
                />
                <span className="placeholder absolute z-20 top-0 left-0 translate-x-2 text-sm -translate-y-[9px] px-[3px] w-fit h-fit duration-100 bg-transparent bg-gradient-to-b from-[#eaeaea] to-white dark:from-[#1a2029] dark:to-[#2b2a33] font-mono text-neutral-800 dark:text-neutral-100">
                  ID
                </span>
              </label>
            </div>
            <div className="expiry-possible relative flex flex-col gap-4">
              <div className="expiry-radio flex flex-col gap-2">
                <span className="text-black dark:text-neutral-200 underline">
                  ID Expiry
                </span>
                <div className="option flex flex-row gap-4 items-center">
                  <label className="text-sm sm:text-base flex items-center gap-1 cursor-pointer text-black dark:text-neutral-200">
                    <input
                      type="radio"
                      name="expiry"
                      id=""
                      value="no"
                      defaultChecked
                      onClick={() => setEventExpiry(false)}
                    />
                    No
                  </label>
                  <label className="text-sm sm:text-base flex items-center gap-1 cursor-pointer text-black dark:text-neutral-200">
                    <input
                      type="radio"
                      name="expiry"
                      id=""
                      value="yes"
                      onClick={() => setEventExpiry(true)}
                    />
                    Yes
                  </label>
                </div>
              </div>
              {eventExpiry && (
                <label className="relative expiry-date" htmlFor="expiryDate">
                  <input
                    id="expiryDate"
                    type="date"
                    name="expiryDate"
                    placeholder="ID Type"
                    required={eventExpiry}
                    className="p-2 border-2 border-gray-300 dark:border-gray-500 hover:border-blue-600 focus:border-blue-600 dark:hover:border-blue-500 dark:focus:border-blue-500 duration-200 outline-none rounded-md w-fit"
                  />
                  <span className="placeholder absolute z-20 top-0 left-0 translate-x-2 text-sm -translate-y-[9px] px-[3px] w-fit h-fit duration-100 bg-transparent bg-gradient-to-b from-[#eaeaea] to-white dark:from-[#1a2029] dark:to-[#2b2a33] font-mono text-neutral-800 dark:text-neutral-100">
                    Expiry
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* File upload section */}
          {isGenerating && <TopLoader />}
          <div className="file-upload flex flex-row flex-wrap items-center w-full gap-4">
            <div className="data-file-upload w-[45%] max-w-[288px] border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg dark:hover:border-cyan-400 hover:border-blue-600 transition-colors duration-200">
              <label
                className="flex flex-col items-center cursor-pointer p-6"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.currentTarget.click();
                  }
                }}
              >
                <Upload className="w-12 h-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Upload CSV/Excel
                </span>
                <input
                  required
                  disabled={isGenerating || downloadBlob !== null}
                  name="csvData"
                  type="file"
                  className="hidden w-full"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  aria-label="Upload CSV file"
                />
              </label>
            </div>

            <div className="template-img-upload w-[45%] max-w-[288px] border-2 border-dashed border-gray-300 dark:border-gray-500 dark:hover:border-cyan-400 rounded-lg hover:border-blue-600 transition-colors duration-200">
              <label
                className="flex flex-col items-center cursor-pointer p-6"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.currentTarget.click();
                  }
                }}
              >
                <File className="w-12 h-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Upload Template
                </span>
                <input
                  disabled={isGenerating || downloadBlob !== null}
                  required
                  name="template"
                  type="file"
                  className="hidden w-full"
                  accept="image/*"
                  onChange={handleTemplateUpload}
                  aria-label="Upload template image"
                />
              </label>
            </div>
          </div>

          {/* Template Preview with Points */}
          {template && (
            <div className="template-preview-container flex flex-col gap-6">
              <h3 className="heading text-lg sm:text-xl underline font-semibold text-black dark:text-neutral-200 w-fit h-fit">
                Template Preview
              </h3>
              <div className="image-container relative inline-block w-fit h-fit">
                <img
                  ref={imageRef}
                  src={template}
                  alt="template"
                  className="max-w-full h-auto rounded-lg cursor-crosshair"
                  onClick={handleImageClick}
                />
                {fields.map(
                  (field) =>
                    field.point && (
                      <motion.div
                        key={field.name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute w-4 h-4 -mt-2 -ml-2 bg-blue-500 rounded-full"
                        style={{
                          left: `${field.point.xPercent}%`,
                          top: `${field.point.yPercent}%`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: `${fontSize}px`,
                            color: fontColor,
                          }}
                          className={`absolute top-5 left-2 whitespace-nowrap bg-blue-100 px-2 py-1 rounded `}
                        >
                          {field.name}
                        </div>
                      </motion.div>
                    )
                )}
              </div>
            </div>
          )}
          {/* Data Preview */}
          {csvData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="data-container flex flex-col gap-6"
            >
              <h3 className="text-lg sm:text-xl underline font-semibold text-black dark:text-neutral-200">
                Data Preview
              </h3>
              <div className="overflow-x-auto rounded-xl shadow-lg dark:shadow-neutral-600">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-neutral-500">
                  <thead className="bg-gray-200 dark:bg-neutral-600">
                    <tr>
                      {csvData.headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-neutral-50 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-neutral-500 divide-y divide-gray-200 dark:divide-gray-400">
                    {csvData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-neutral-200"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {csvData.hasMore && (
                <p className="text-sm text-gray-500 dark:text-neutral-300 font-semibold mt-2">
                  ... truncated
                </p>
              )}
            </motion.div>
          )}
          {/* Field Mapping */}
          {fields.length > 0 && (
            <div className="field mapping flex flex-col gap-4">
              <h3 className="text-xl font-semibold underline">
                Field Positions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="font-medium text-black dark:text-neutral-200">
                      {field.name}
                    </span>
                    <button
                      disabled={isGenerating || downloadBlob !== null}
                      type="button"
                      onClick={() => setSelectedField(field.name)}
                      className={`mt-2 px-4 py-2 font-semibold rounded-md text-sm w-full ${
                        field.point
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {field.point ? "Update Position" : "Set Position"}
                    </button>
                    {field.point && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
                        Position: ({field.point.xPercent.toFixed(1)}%,{" "}
                        {field.point.yPercent.toFixed(1)}%)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Font Settings */}
          <div className="font-setting flex gap-4 items-center flex-wrap">
            {/* Font style */}
            <div className="flex flex-col gap-2 ">
              <label className="text-sm sm:text-base underline font-medium w-fit h-fit">
                Font Family
              </label>
              <select
                disabled={isGenerating || downloadBlob !== null}
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="p-2 border-2 border-neutral-300 dark:border-neutral-600 hover:border-blue-700 active:border-blue-700 focus:border-blue-700 dark:hover:border-cyan-600 dark:active:border-cyan-600 dark:focus:border-cyan-600  duration-200 rounded-md w-fit"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font size */}
            <div className="font-size flex flex-col gap-2 items-center justify-center">
              <label className="text-sm sm:text-base underline font-medium w-fit h-fit">
                Font Size
              </label>
              <select
                disabled={isGenerating || downloadBlob !== null}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="p-2 border-2 border-neutral-300 dark:border-neutral-600 hover:border-blue-700 active:border-blue-700 focus:border-blue-700 dark:hover:border-cyan-600 dark:active:border-cyan-600 dark:focus:border-cyan-600  duration-200 rounded-md w-fit"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>

            {/* Font color */}
            <div className="font-color flex flex-col gap-2 items-center justify-center">
              <label className="text-sm sm:text-base underline font-medium w-fit h-fit">
                Font Color
              </label>
              <input
                disabled={isGenerating || downloadBlob !== null}
                type="color"
                className="h-[40px] border-2"
                name="fontColor"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFontColor(event.target.value);
                }}
              />
            </div>
          </div>
          {/* Type */}
          <div className="choice w-fit h-fit flex flex-row flex-wrap gap-6">
            <label
              className={`text-base flex items-center gap-1 cursor-pointer text-black dark:text-neutral-200 ${
                isGenerating || downloadBlob !== null
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <input
                disabled={isGenerating || downloadBlob !== null}
                defaultChecked
                type="radio"
                name="generationType"
                id=""
                value="PNG"
              />
              PNG
            </label>
            <label
              className={`text-sm sm:text-base flex items-center gap-2 cursor-pointer text-black dark:text-neutral-200 ${
                isGenerating || downloadBlob !== null
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <input
                disabled={isGenerating || downloadBlob !== null}
                type="radio"
                name="generationType"
                id=""
                value="PDF"
              />
              PDF
            </label>
          </div>
          {/* Mailing option */}
          <div className="mailing w-fit h-fit flex flex-row flex-wrap gap-6">
            <label
              className={`text-sm sm:text-base flex items-center gap-2 text-black dark:text-neutral-200 ${
                isGenerating || downloadBlob !== null || !Mailing
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >
              <input
                disabled={isGenerating || downloadBlob !== null || !Mailing}
                type="checkbox"
                name="mailing"
                className={`${
                  isGenerating || downloadBlob !== null || !Mailing
                    ? "cursor-not-allowed"
                    : ""
                }`}
              />
              Mailing
            </label>
          </div>
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-100 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          {/* Generation button */}
          <div className="button flex flex-row flex-wrap gap-4 w-fit h-fit">
            <button
              disabled={isGenerating || downloadBlob !== null}
              type="submit"
              className={`submit-button w-[150px] h-10 px-4 py-2 text-white bg-blue-800 dark:bg-blue-600 rounded-lg font-semibold flex flex-row gap-2 items-center justify-center ${
                isGenerating || downloadBlob !== null
                  ? "cursor-not-allowed opacity-60"
                  : ""
              } `}
            >
              {isGenerating ? "Generating" : "Generate"}
              {isGenerating && (
                <SubmissionLoader color="pink" height={20} width={20} />
              )}
            </button>
            <button
              onClick={() => {
                setCsvData(null);
                setTemplate(null);
                setFields([]);
                setError(null);
                setFontSize(16);
                setFontFamily("Arial");
                setDownloadBlob(null);
                setFontColor("#000000");
                setEventExpiry(false);
                formRef.current?.reset();
              }}
              type="button"
              disabled={isGenerating}
              className={`reset-button w-[150px] h-10 px-4 py-2 text-white bg-red-800 dark:bg-red-600 rounded-lg font-semibold flex flex-row gap-2 items-center justify-center ${
                isGenerating ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              Reset
            </button>
            <button
              disabled={isGenerating || !downloadBlob}
              type="button"
              className={`download-button w-[150px] h-10 px-4 py-2 text-white bg-blue-800 dark:bg-blue-600 rounded-lg font-semibold flex flex-row gap-2 items-center justify-center ${
                isGenerating || !downloadBlob
                  ? "cursor-not-allowed opacity-60"
                  : ""
              } `}
              onClick={() => {
                if (!downloadBlob) return;
                const url = URL.createObjectURL(downloadBlob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "ids.zip");
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(url);
              }}
            >
              Download
            </button>
          </div>
        </form>
      </div>
    );
}

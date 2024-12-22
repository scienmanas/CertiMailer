import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, File } from "lucide-react";
import Papa from "papaparse";
import { TopLoader, SubmissionLoader } from "@/app/ui/loaders";

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

interface CSVData {
  headers: string[];
  rows: any[][];
  hasMore: boolean;
}

interface ImageDimensions {
  width: number;
  height: number;
}

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB in bytes
const MAX_ROWS = 400;

export function Generate(): JSX.Element {
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<FieldMapping[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  // const [imageDimensions, setImageDimensions] =
  //   useState<ImageDimensions | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      // Validate the type of file
      const fileExtension = file.name.split(".").pop()?.toLocaleLowerCase();
      console.log(fileExtension);
      if (fileExtension !== "csv") {
        setError("Please upload a CSV file");
        return;
      }

      // Start parsing
      Papa.parse(file, {
        complete: (results) => {
          if (results.data.length < 2) {
            setError("CSV file must contain at least headers and one data row");
            return;
          }

          // Check if the number of rows is within limits
          if (results.data.length > MAX_ROWS) {
            setError(
              `CSV file contains more than ${MAX_ROWS} rows. Please upload a smaller file rows < 400.`
            );
            if (formRef.current) {
              formRef.current.reset();
            }
            return;
          }

          // Get all the headers and rows
          const headers = results.data[0] as string[];
          const rows = results.data.slice(1) as string[][];
          const parsedData: CSVData = {
            headers,
            rows: rows.slice(0, 10), // Slice to 10
            hasMore: rows.length > 10, // indicate of more rows are present
          };
          setCsvData(parsedData); // Set the data
          setFields(
            headers.map((header) => ({
              name: header,
              mapping: "",
            }))
          );
          setError(null); // Reset the error
        },
        error: (error) => {
          setError(`Error parsing CSV: ${error.message}`);
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
    }
  };

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Validate the type of file
    if (!file.type.startsWith("image/")) {
      setError("Please upload only image files");
      if (formRef.current) {
        formRef.current.reset();
      }
      return;
    }

    // Validate size of the image
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image size is too large. Please upload a image < 1MB.");
      if (formRef.current) {
        formRef.current.reset();
      }
      return;
    }

    // Read and set as template
    const image = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;
      image.src = e.target.result as string;

      image.onload = () => {
        // const originalWidth = image.width;
        // const orginalHeight = image.height;

        // // Calculate the aspect ration
        // const aspectRatio = originalWidth / orginalHeight;
        // // Limit the dimension
        // const maxDimension = 1000;
        // let newWidth, newHeight;

      }

    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
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
  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);

    const formData = new FormData(event.target as HTMLFormElement);
    // const response = await
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmission}
      className="wrapped-function-container w-full p-2 flex flex-col gap-10"
    >
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
            <span className="mt-2 text-sm text-gray-500">Upload CSV/Excel</span>
            <input
              required
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
            <span className="mt-2 text-sm text-gray-500">Upload Template</span>
            <input
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
      {/* Template Preview with Points */}
      {template && (
        <div className="template-preview-container relative flex flex-col gap-6">
          <h3 className="heading text-lg sm:text-xl underline font-semibold text-black dark:text-neutral-200">
            Template Preview
          </h3>
          <div className="image-container relative inline-block">
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
                    <div className="absolute top-5 left-2 text-xs whitespace-nowrap bg-blue-100 dark:bg-blue-600 px-2 py-1 rounded">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold mb-4">Field Mapping</h3>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="w-1/4 text-sm font-medium">{field.name}</span>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setSelectedField(field.name)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      field.point
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {field.point ? "Update Point" : "Mark Point"}
                  </button>

                  {field.point && (
                    <div className="flex space-x-4">
                      <div className="bg-gray-100 px-3 py-2 rounded-md">
                        <span className="text-sm text-gray-600">
                          X: {field.point.xPercent}%
                        </span>
                      </div>
                      <div className="bg-gray-100 px-3 py-2 rounded-md">
                        <span className="text-sm text-gray-600">
                          Y: {field.point.yPercent}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {/* Generation button */}
      <button
        type="submit"
        className={`button w-[150px] h-10 px-4 py-2 text-white bg-blue-800 dark:bg-blue-600 rounded-lg font-semibold flex flex-row gap-2 items-center justify-center ${
          isGenerating ? "cursor-not-allowed opacity-60" : ""
        } `}
      >
        {isGenerating ? "Generating" : "Generate"}
        {isGenerating && (
          <SubmissionLoader color="pink" height={20} width={20} />
        )}
      </button>
    </form>
  );
}

// Actual and restrciting image to a dimension of 500x500 - and checking the fields are not null all are done

"use client";

import { useState } from "react";
import Image from "next/image";
import UploadIcon from "@/public/assets/universal/upload.png";

export function UploadId(): JSX.Element {
  // constant variables - image maximum dimesion
  const maxImgDimension = {
    height: 352 * 1.5,
    width: 352 * 2,
  };

  // state for image holder
  const [image, setImage] = useState<null | string>(null);
  const [drag, setDrag] = useState<boolean>(false);
  const [imgDimension, setImgDimension] = useState<null | {
    width: number;
    height: number;
  }>(null);

  return (
    <div className="relative upload-id w-full h-full flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="form-and-content-wrapper w-fit h-fit p-4 sm:p-6 bg-neutral-100 rounded-3xl flex flex-col gap-6">
        <div className="upper-text-and-cross-button w-full h-fit flex flex-row items-center justify-between gap-5">
          <div className="text-heading text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold p-2 flex flex-row gap-1 w-fit h-fit">
            <span>📤 Upload,</span>
            <span>⚙️ Configure</span>
            <span>& all set! 😎</span>
          </div>
          <button className="relative close-button w-fit h-fit flex flex-col gap-1 group cursor-pointer">
            <div className="line w-5 h-[3px] bg-neutral-800 duration-[400ms] transition-transform rotate-45 group-hover:-rotate-45"></div>
            <div className="line w-5 h-[3px] bg-neutral-800 duration-[400ms] transition-transform -rotate-45 -translate-y-1 group-hover:rotate-45"></div>
          </button>
        </div>
        <form className="form-actual relative w-full h-fit flex flex-col gap-4">
          <div className="top-upload-and-embeding-manager relative w-full">
            <div className="upload-center flex w-full items-center justify-center">
              <label
                htmlFor=""
                className="relative top-upload-manage-content flex w-fit h-fit border-2 rounded-3xl border-pink-600 border-dashed hover:border-purple-800 duration-300 items-center"
              >
                <input
                  onDragEnter={() => setDrag(true)}
                  onDragExit={() => setDrag(false)}
                  onDrop={() => setDrag(false)}
                  className="absolute z-30 w-full h-full rounded-3xl opacity-0 cursor-pointer"
                  accept="image/"
                  required
                  type="file"
                  name="id-file"
                  id=""
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const file = target.files?.[0] || null;
                    if (file) {
                      // get the uploaded image url
                      const image = URL.createObjectURL(file);

                      // Use native image object
                      const nativeImgElement = new window.Image();
                      nativeImgElement.src = image;

                      // Update the dimentions
                      nativeImgElement.onload = () => {
                        // Get the orginal dimenion of the image
                        const orginalWidth = nativeImgElement.naturalWidth;
                        const originalHeight = nativeImgElement.naturalHeight;

                        // desired varibles setup
                        const aspectRatio = originalHeight / orginalWidth;
                        let desireddHeight = 0;
                        let desiredWidth = 0;

                        // Desired dimension - configuration and conditions
                        if (orginalWidth > maxImgDimension.width) {
                          desiredWidth = maxImgDimension.width;
                          desireddHeight = aspectRatio * desiredWidth;
                        } else if (desireddHeight > maxImgDimension.height) {
                          desireddHeight = maxImgDimension.height;
                          desiredWidth = desireddHeight * (1 / aspectRatio);
                        } else {
                          desiredWidth = orginalWidth;
                          desireddHeight = originalHeight;
                        }

                        // Still check for height
                        if (desireddHeight > maxImgDimension.height) {
                          desireddHeight = maxImgDimension.height;
                          desiredWidth = desireddHeight * (1 / aspectRatio);
                        }

                        // Set the resized image dimension
                        setImgDimension({
                          width: desiredWidth,
                          height: desireddHeight,
                        });

                        // Create a canvas element
                        const canvas = document.createElement("canvas");
                        canvas.width = desiredWidth;
                        canvas.height = desireddHeight;

                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                          // Draw thw image into the canvas with new dimension
                          ctx.drawImage(
                            nativeImgElement,
                            0,
                            0,
                            desiredWidth,
                            desireddHeight
                          );

                          // convert the canvas component to a blob (resized image)
                          canvas.toBlob((blob) => {
                            if (blob) {
                              // Now set the url
                              setImage(URL.createObjectURL(blob));

                              // Optionally, if ygitou need the resized image file:
                              const resizedFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                              });
                            }
                          }, file.type);
                        }
                      };
                    }
                  }}
                />
                {!image && (
                  <div className="relative z-10 upload-box-dummy w-[44rem] h-[22rem] flex flex-col items-center justify-center rounded-3xl gap-2 ">
                    <div
                      className={`svg-img w-fit h-fit duration-300 transition-all transform ${
                        drag ? "rotate-12" : null
                      }`}
                    >
                      <Image
                        width={80}
                        height={80}
                        src={UploadIcon}
                        alt="load-icon"
                      />
                    </div>
                    <div className="text-contents flex flex-col items-center justify-center w-fit h-fit">
                      <div className="w-fit h-fit flex flex-row gap-1 items-center font-semibold">
                        <span>Drop</span>
                        <span className="font-bold text-green-800">or</span>
                        <span>browse the</span>
                        <span className="text-pink-700">file</span>
                      </div>
                      <div className="w-fit h-fit flex flex-row gap-1 items-center">
                        <span>Accepted format:</span>
                        <span>png, jpg, jpeg</span>
                      </div>
                    </div>
                  </div>
                )}
                {image && (
                  <div className="relative img-diisplay-container z-20 rounded-3xl">
                    <Image
                      className="rounded-3xl"
                      width={imgDimension?.width || 0}
                      height={imgDimension?.height || 0}
                      layout="intrinsic"
                      src={image}
                      alt="id-upload-viewer"
                    />
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="button-manager w-fit h-fit">
            <label htmlFor="" className="w-fit h-fit">
              <button
                className="text-white text-center bg-neutral-800 rounded-md w-24 py-2 hover:scale-105 duration-300"
                type="submit"
              >
                <span className="font-semibold">Submit</span>
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

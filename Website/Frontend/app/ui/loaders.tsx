import { submissionLoaderProps } from "@/app/lib/definitions";

export function WaitListSubmitLoader(): JSX.Element {
  return (
    <div className="flex justify-center items-center w-fit h-fit">
      <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
    </div>
  );
}

export function NewsLetterSubmitLoader(): JSX.Element {
  return (
    <div className="flex justify-center items-center w-fit h-fit">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
    </div>
  );
}

export function FetchDataLoader(): JSX.Element {
  return (
    <div className="flex justify-center items-center w-fit h-fit">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-pink-300"></div>
    </div>
  );
}

export function SubmissionLoader({
  width,
  height,
  color,
}: submissionLoaderProps): JSX.Element {
  return (
    <div className="flex justify-center items-center w-fit h-fit">
      <div
        style={{
          width: width,
          height: height,
          borderColor: color,
        }}
        className="animate-spin rounded-full border-b-2 "
      ></div>
    </div>
  );
}

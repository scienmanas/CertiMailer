import Link from "next/link";

export default function Learn(): JSX.Element {
  const youtubeVideoSource =
    "https://www.youtube.com/embed/zZEh9CoZUlw?si=3wDsUT8qncRJJaE3";

  return (
    <div className="relative learn-tab w-full h-full p-2">
      <div className="content-wrapped flex flex-col gap-7 items-center w-full">
        <div className="w-fit h-fit video sm:w-[500px] sm:h-80 md:w-[658px] md:h-96 mt-5 border-2 border-pink-500 rounded-md">
          <iframe
            width="100%"
            height="100%"
            src={youtubeVideoSource}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="line w-full">
          <hr className="border-t border-gray-300" />
        </div>
        <div className="further-details w-full flex flex-col items-center justify-center gap-4">
          <div className="heading w-fit flex flex-col items-center justify-center gap-2">
            <div className="text-lg sm:text-xl md:text-3xl font-semibold flex flex-row gap-1">
              <span className="underline decoration-wavy decoration-pink-400">
                Watch the video above
              </span>
              <span>📹📷</span>
            </div>
            <div className="text-xs text-center smt:text-sm md:text-base">
              (We hope you're a very intelligent 🧠 person who will understand
              how to use it. 😜)
            </div>
          </div>
          <div className="w-fit text-sm sm:text-base text-center">
            <span>Still Facing problems? </span>
            <span>Don't worry. </span>
            <span>Just shoot me a mail at: </span>
            <span className="font-semibold text-cyan-600 cursor-pointer hover:underline duration-200">
              <Link href={"mailto:manas@certimailer.xyz"}>
                manas@certimailer.xyz
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

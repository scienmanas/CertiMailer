export default function Issues(): JSX.Element {
  return (
    <div className="relative issues-tab w-full h-full p-4">
      <div className="content-wrapped flex flex-col gap-6 items-center w-full h-full justify-center">
        <h1 className="text-black font-semibold underline text-2xl">
          Welcome to Issues Tab
        </h1>
        <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-wrap w-fit h-fit max-w-[40rem]">
          We believe that issues are unlikely to arise; however, if you do
          encounter any challenges, we are here to assist you promptly. Please
          do not hesitate to reach out to us at our official email address.
          <a
            href="mailto:manas@certimailer.xyz"
            className="text-blue-700 underline font-semibold"
          >
            manas@certimailer.xyz
          </a>
          . Your satisfaction and seamless experience are our priorities, and we
          are committed to resolving any concerns efficiently. Thank you for
          choosing our services.
        </p>
      </div>
    </div>
  );
}

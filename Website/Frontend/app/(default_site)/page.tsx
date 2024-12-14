import { Navbar } from "@/app/ui/universal/Navbar";
import { Footer } from "@/app/ui/universal/Footer";
import { Hero } from "@/app/ui/landing/Hero";
import { Ribbon } from "@/app/ui/landing/Ribbon";
import { Features } from "@/app/ui/landing/Features";
import { FAQ } from "@/app/ui/landing/FAQ";
import { Demo } from "@/app/ui/landing/Demo";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 relative sm:gap-20 items-center w-full scroll-smooth">
      <div className="page-contents relative w-full h-fit flex flex-col items-center justify-center gap-16">
        {/* Navbar at the top, fixed to the viewport */}
        <div className="gradient-blurred absolute w-full h-dvh -z-10 bg-transparent bg-gradient-to-br top-0 left-0 from-pink-800 dark:from-pink-700 dark:to-[#282c33] to-[#eaeaea] to-45% opacity-30 blur-md"></div>
        <section className="nav z-10 flex w-full h-fit items-center justify-center">
          <Navbar />
        </section>

        {/* Main content area for the children components */}
        <section className="relative flex flex-col z-0 child-body w-full h-fit gap-10 sm:gap-12 md:gap-16 lg:gap-20">
          <Hero />
          <Ribbon />
          <Demo />
          <Features />
          <FAQ />
        </section>

        {/* Footer at the bottom of the page */}
        <section className="w-full">
          <Footer />
        </section>
      </div>
    </main>
  );
}

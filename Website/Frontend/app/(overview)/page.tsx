import { Navbar } from "@/app/ui/landing/Navbar";
import { Footer } from "@/app/ui/landing/Footer";
import { Hero } from "@/app/ui/landing/Hero";
import { Waitlist } from "@/app/ui/landing/Waitlist";
import { MadeUsingRibbon } from "@/app/ui/landing/MadeUsing";
import { Features } from "@/app/ui/landing/Features";
import { ChatBot } from "@/app/ui/landing/ChatBot";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 sm:gap-20 items-center w-full scroll-smooth">
      <Navbar />
      <Hero />
      <MadeUsingRibbon />
      <Features />
      <Waitlist />
      <Footer />
      <ChatBot />
    </main>
  );
}

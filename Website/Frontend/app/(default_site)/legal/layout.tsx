import { Navbar } from "@/app/ui/universal/Navbar";
import { Footer } from "@/app/ui/universal/Footer";

// Layout component that wraps the blog page contents
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page-contents relative w-full h-fit flex flex-col items-center justify-center gap-6">
      <div className="navbar w-full h-fit">
        <Navbar />
      </div>
      <main className="w-full h-fit flex flex-col items-center justify-center p-4 mt-14">
        {children}
      </main>
      <div className="footer w-full h-fit">
        <Footer />
      </div>
    </div>
  );
}

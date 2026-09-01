import Projects from "@/designUI/sections/Projects/Projects";
import Footer from "@/designUI/sections/Footer/Footer";

export default function ProjectsPage() {
  return (
    <>
      <main className="mt-[20px] flex flex-1 flex-col md:mt-0 md:pt-[40px] lg:mt-[90px]">
        <Projects />
      </main>
      <Footer />
    </>
  );
}

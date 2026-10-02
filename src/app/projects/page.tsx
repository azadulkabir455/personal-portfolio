import Projects from "@/designUI/sections/Projects/Projects";
import RecentDesign from "@/designUI/sections/RecentDesign/RecentDesign";
import Footer from "@/designUI/sections/Footer/Footer";

export default function ProjectsPage() {
  return (
    <>
      <main className="mt-[20px] flex flex-1 flex-col md:mt-0 md:pt-[40px] lg:mt-[90px]">
        <Projects />
        <div className="mt-[20px] md:mt-[40px] lg:mt-[80px]">
          <RecentDesign />
        </div>
      </main>
      <Footer />
    </>
  );
}

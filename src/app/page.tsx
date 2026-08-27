import Hero from "@/designUI/sections/Hero/Hero";
import Feature from "@/designUI/sections/Feature/Feature";
import Story from "@/designUI/sections/Story/Story";
import Journey from "@/designUI/sections/Journey/Journey";
import FeaturedProjects from "@/designUI/sections/FeaturedProjects/FeaturedProjects";
import RecentDesign from "@/designUI/sections/RecentDesign/RecentDesign";
import CaseStudy from "@/designUI/sections/CaseStudy/CaseStudy";
import Services from "@/designUI/sections/Services/Services";
import Blog from "@/designUI/sections/Blog/Blog";
import Footer from "@/designUI/sections/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <Feature />
        <Story />
        <Journey />
        <FeaturedProjects />
        <RecentDesign />
        <Services />
        <CaseStudy />
        <Blog />
      </main>
      <Footer />
    </>
  );
}

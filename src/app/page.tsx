"use client";

import { usePageDataLoading } from "@/customHooks/usePageDataLoading";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { defaultSectionVisibility } from "@/designUI/admin/utilities/content/landingSections";
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
import ScrollSpy from "@/designUI/sections/ScrollSpy/ScrollSpy";
import PageLoader from "@/designUI/components/PageLoader/PageLoader";

export default function HomePage() {
  const isLoading = usePageDataLoading();
  const { data: sectionVisibility } = useSectionContent("homeSections", defaultSectionVisibility);

  return (
    <>
      <PageLoader isLoading={isLoading} />

      <main className="flex flex-1 flex-col">
        {sectionVisibility.hero && <Hero />}
        <Feature />
        {sectionVisibility.story && <Story />}
        {sectionVisibility.journey && <Journey />}
        {sectionVisibility.featuredProjects && <FeaturedProjects />}
        {sectionVisibility.recentDesign && <RecentDesign />}
        {sectionVisibility.services && <Services />}
        {sectionVisibility.caseStudy && <CaseStudy />}
        {sectionVisibility.blog && <Blog />}
      </main>
      <Footer />
      <ScrollSpy />
    </>
  );
}

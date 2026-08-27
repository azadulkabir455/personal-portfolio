"use client";

import Container from "@/designUI/elements/Container/Container";
import { useCaseStudy } from "./function";
import CaseStudySlide from "./comp/CaseStudySlide";
import CaseStudyArrows from "./comp/CaseStudyArrows";

export default function CaseStudy() {
  const { activeSlide, goToPrevious, goToNext, canGoPrevious, canGoNext } = useCaseStudy();

  return (
    <Container variant="section" className="relative w-full overflow-hidden">
      <Container className="px-[5px] md:px-[10px]">
        <CaseStudySlide {...activeSlide}>
          <CaseStudyArrows
            onPrevious={goToPrevious}
            onNext={goToNext}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
        </CaseStudySlide>
      </Container>
    </Container>
  );
}

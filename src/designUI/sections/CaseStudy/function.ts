"use client";

import { useState } from "react";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { caseStudyContent } from "@/designUI/utilities/content/caseStudy";

export function useCaseStudy() {
  const { data, isLoading } = useSectionContent("caseStudy", caseStudyContent);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = data.slides.length;

  const goToPrevious = () => setActiveIndex((index) => Math.max(index - 1, 0));
  const goToNext = () => setActiveIndex((index) => Math.min(index + 1, count - 1));

  return {
    data,
    isLoading,
    activeSlide: data.slides[activeIndex],
    goToPrevious,
    goToNext,
    canGoPrevious: activeIndex > 0,
    canGoNext: activeIndex < count - 1,
  };
}

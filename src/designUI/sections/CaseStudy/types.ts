import type { ReactNode } from "react";
import type { CaseStudySlide } from "@/designUI/utilities/content/caseStudy";

export interface CaseStudySlideProps extends CaseStudySlide {
  children?: ReactNode;
}

export interface CaseStudyArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

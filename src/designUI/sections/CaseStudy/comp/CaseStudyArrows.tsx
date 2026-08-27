import type { ReactNode } from "react";
import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import { ArrowLeftIcon, ArrowRightIcon } from "@/designUI/utilities/icons";
import type { CaseStudyArrowsProps } from "../types";

function ArrowBracket({ color, children }: { color: string; children: ReactNode }) {
  return (
    <Container variant="span" className="flex items-center gap-[4px]">
      <Container
        variant="span"
        className="h-[18px] w-[7px] border-y-[2px] border-l-[2px] transition-colors duration-200 md:h-[22px] md:border-y-[2.5px] md:border-l-[2.5px]"
        style={{ borderColor: color }}
      />
      {children}
      <Container
        variant="span"
        className="h-[18px] w-[7px] border-y-[2px] border-r-[2px] transition-colors duration-200 md:h-[22px] md:border-y-[2.5px] md:border-r-[2.5px]"
        style={{ borderColor: color }}
      />
    </Container>
  );
}

export default function CaseStudyArrows({ onPrevious, onNext, canGoPrevious, canGoNext }: CaseStudyArrowsProps) {
  const previousColor = canGoPrevious ? "#FFFFFF" : "#616161";
  const nextColor = canGoNext ? "#FFFFFF" : "#616161";

  return (
    <Container className="flex items-center justify-center gap-[18px]">
      <Container
        role="button"
        tabIndex={canGoPrevious ? 0 : -1}
        onClick={canGoPrevious ? onPrevious : undefined}
        aria-label="Previous case study"
        aria-disabled={!canGoPrevious}
        className={clsx(
          "flex items-center justify-center bg-transparent transition-colors duration-200",
          canGoPrevious ? "cursor-pointer" : "cursor-default",
        )}
      >
        <ArrowBracket color={canGoPrevious ? "#388EFF" : "transparent"}>
          <ArrowLeftIcon className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" color={previousColor} />
        </ArrowBracket>
      </Container>
      <Container
        role="button"
        tabIndex={canGoNext ? 0 : -1}
        onClick={canGoNext ? onNext : undefined}
        aria-label="Next case study"
        aria-disabled={!canGoNext}
        className={clsx(
          "flex items-center justify-center bg-transparent transition-colors duration-200",
          canGoNext ? "cursor-pointer" : "cursor-default",
        )}
      >
        <ArrowBracket color={canGoNext ? "#388EFF" : "transparent"}>
          <ArrowRightIcon className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" color={nextColor} />
        </ArrowBracket>
      </Container>
    </Container>
  );
}

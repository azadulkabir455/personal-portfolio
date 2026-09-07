"use client";

import { useEffect, useMemo, useState } from "react";
import { scrollSpyContent } from "@/designUI/utilities/content/scrollSpy";
import { defaultSectionVisibility } from "@/designUI/admin/utilities/content/landingSections";
import { useSectionContent } from "@/customHooks/useSectionContent";

export function useScrollSpy() {
  const { data: sectionVisibility } = useSectionContent("homeSections", defaultSectionVisibility);
  const sections = useMemo(
    () =>
      scrollSpyContent.sections.filter(
        (section) => !section.visibilityKey || sectionVisibility[section.visibilityKey],
      ),
    [sectionVisibility],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActiveIndex(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return {
    sections,
    activeIndex,
    isOpen,
    toggleOpen: () => setIsOpen((open) => !open),
    close: () => setIsOpen(false),
    scrollToSection,
  };
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { journeyContent } from "@/designUI/utilities/content/journey";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { toTelLink } from "@/designUI/utilities/phone";

export function useJourney() {
  const { data, isLoading } = useSectionContent("journey", journeyContent);
  const { data: personalInfo } = useSectionContent("personalInfo", personalInfoContent);

  return {
    data: { ...data, intro: { ...data.intro, ctaLink: toTelLink(personalInfo.phone) } },
    phone: personalInfo.phone,
    isLoading,
  };
}

export function useStickySteps() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ contentHeight: 0, viewportHeight: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const heading = headingRef.current;
    const card = cardRef.current;
    const list = listRef.current;
    if (!wrapper || !sticky || !heading || !card || !list) return;

    let overflow = 0;
    let offset = 0;
    let frame = 0;

    const applyProgress = () => {
      frame = 0;
      const scrolled = offset - wrapper.getBoundingClientRect().top;
      const progress = overflow > 0 ? Math.min(Math.max(scrolled / overflow, 0), 1) : 0;
      list.style.transform = `translate3d(0, ${-progress * overflow}px, 0)`;
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(applyProgress);
    };

    const measure = () => {
      const cardStyle = getComputedStyle(card);
      const cardPadding = parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom);
      const contentHeight = heading.offsetHeight + cardPadding + list.offsetHeight;
      offset = parseFloat(getComputedStyle(sticky).top) || 0;
      const viewportHeight = window.innerHeight - offset;
      overflow = Math.max(contentHeight - viewportHeight, 0);
      setLayout(overflow > 0 ? { contentHeight, viewportHeight } : { contentHeight: 0, viewportHeight: 0 });
      applyProgress();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(heading);
    observer.observe(list);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return {
    wrapperRef,
    stickyRef,
    headingRef,
    cardRef,
    listRef,
    isSticky: layout.contentHeight > 0,
    contentHeight: layout.contentHeight,
    viewportHeight: layout.viewportHeight,
  };
}

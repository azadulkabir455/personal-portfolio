"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { topBarContent } from "@/designUI/utilities/content/topbar";
import { personalInfoContent } from "@/designUI/utilities/content/personalInfo";
import { toTelLink } from "@/designUI/utilities/phone";
import type { TopBarMode } from "./types";

const topThreshold = 24;
const autoHideDelay = 3000;
const pageMargin = 20;
const headerRowHeight = 100;
const mobilePageMargin = 10;
const tabletPageMargin = 20;
const tabletBreakpointQuery = "(min-width: 768px)";

export function useTopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data, isLoading } = useSectionContent("topbar", topBarContent);
  const { data: personalInfo } = useSectionContent("personalInfo", personalInfoContent);
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isTabletUp, setIsTabletUp] = useState(false);

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(tabletBreakpointQuery);
    const updateIsTabletUp = () => setIsTabletUp(query.matches);
    updateIsTabletUp();
    query.addEventListener("change", updateIsTabletUp);
    return () => query.removeEventListener("change", updateIsTabletUp);
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= topThreshold);
      setIsVisible(true);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen || isAtTop || !isVisible || isHovered) return;

    const timeout = setTimeout(() => setIsVisible(false), autoHideDelay);
    return () => clearTimeout(timeout);
  }, [isOpen, isAtTop, isVisible, isHovered]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const mode: TopBarMode = isOpen
    ? "menu"
    : isAtTop
      ? isHome
        ? "transparent"
        : "sticky"
      : isVisible
        ? "sticky"
        : "hidden";
  const menuHeight = Math.max(viewportHeight - headerRowHeight - pageMargin, 0);
  const mobileMenuHeight = Math.max(
    viewportHeight - (isTabletUp ? tabletPageMargin : mobilePageMargin),
    0,
  );

  return {
    data,
    talkHref: toTelLink(personalInfo.phone),
    phone: personalInfo.phone,
    resumeHref: personalInfo.cv,
    isLoading,
    isOpen,
    mode,
    menuHeight,
    mobileMenuHeight,
    toggleOpen: () => setIsOpen((open) => !open),
    closeMenu: () => setIsOpen(false),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };
}

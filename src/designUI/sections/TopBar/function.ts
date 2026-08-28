"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { topBarContent } from "@/designUI/utilities/content/topbar";
import type { TopBarMode } from "./types";

const TOP_THRESHOLD = 24;
const AUTO_HIDE_DELAY = 3000;
const PAGE_MARGIN = 20;
const HEADER_ROW_HEIGHT = 100;
const MOBILE_PAGE_MARGIN = 10;
const TABLET_PAGE_MARGIN = 20;
const TABLET_BREAKPOINT_QUERY = "(min-width: 768px)";

export function useTopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data, isLoading } = useSectionContent("topbar", topBarContent);
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
    const query = window.matchMedia(TABLET_BREAKPOINT_QUERY);
    const updateIsTabletUp = () => setIsTabletUp(query.matches);
    updateIsTabletUp();
    query.addEventListener("change", updateIsTabletUp);
    return () => query.removeEventListener("change", updateIsTabletUp);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= TOP_THRESHOLD);
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen || isAtTop || !isVisible || isHovered) return;

    const timeout = setTimeout(() => setIsVisible(false), AUTO_HIDE_DELAY);
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
  const menuHeight = Math.max(viewportHeight - HEADER_ROW_HEIGHT - PAGE_MARGIN, 0);
  const mobileMenuHeight = Math.max(
    viewportHeight - (isTabletUp ? TABLET_PAGE_MARGIN : MOBILE_PAGE_MARGIN),
    0,
  );

  return {
    data,
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

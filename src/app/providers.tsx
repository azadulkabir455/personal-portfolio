"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePageDataLoading } from "@/customHooks/usePageDataLoading";

const PAGE_LOADER_EXIT_DURATION = 1700;

export default function Providers({ children }: { children: React.ReactNode }) {
  const isLoading = usePageDataLoading();

  useEffect(() => {
    if (isLoading) return;

    const timeout = setTimeout(() => {
      AOS.init({ duration: 700, once: true, offset: 80 });
    }, PAGE_LOADER_EXIT_DURATION);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return <>{children}</>;
}

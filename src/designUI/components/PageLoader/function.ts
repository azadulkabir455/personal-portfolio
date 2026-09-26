"use client";

import { useEffect, useState } from "react";

const exitDelay = 120;
const exitDuration = 1700;

export function usePageLoader(isLoading: boolean) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const timeout = setTimeout(() => setIsExiting(true), exitDelay);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    if (!isExiting) return;

    const timeout = setTimeout(() => setShouldRender(false), exitDuration);
    return () => clearTimeout(timeout);
  }, [isExiting]);

  return { shouldRender, isExiting };
}

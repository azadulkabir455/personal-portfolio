"use client";

import { useEffect, useState } from "react";

const EXIT_DURATION = 1700;

export function usePageLoader(isLoading: boolean) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    setIsExiting(true);
    const timeout = setTimeout(() => setShouldRender(false), EXIT_DURATION);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return { shouldRender, isExiting };
}

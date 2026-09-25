"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const pointerQuery = "(hover: hover) and (pointer: fine)";
const cursorSize = 40;
const springConfig = { damping: 26, stiffness: 300, mass: 0.4 };

export function useCustomCursor() {
  const left = useMotionValue(-100);
  const top = useMotionValue(-100);

  const springLeft = useSpring(left, springConfig);
  const springTop = useSpring(top, springConfig);

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(pointerQuery);
    const updateEnabled = () => setIsEnabled(query.matches);
    updateEnabled();
    query.addEventListener("change", updateEnabled);
    return () => query.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMove = (event: MouseEvent) => {
      left.set(event.clientX - cursorSize / 2);
      top.set(event.clientY - cursorSize / 2);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isEnabled, left, top]);

  return { left: springLeft, top: springTop, size: cursorSize, isEnabled };
}

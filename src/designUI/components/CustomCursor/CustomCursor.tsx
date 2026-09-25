"use client";

import { motion } from "framer-motion";
import { useCustomCursor } from "./function";

export default function CustomCursor() {
  const { left, top, size, isEnabled } = useCustomCursor();

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full border-[1.5px] border-blue-500/70"
      style={{
        left,
        top,
        width: size,
        height: size,
        backgroundColor: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(6px) saturate(180%)",
        WebkitBackdropFilter: "blur(6px) saturate(180%)",
      }}
    />
  );
}

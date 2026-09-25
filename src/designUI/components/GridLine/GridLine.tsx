"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";

export function GridLineLight({
  orientation,
  delay = 0,
  duration = 5.5,
}: {
  orientation: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
}) {
  const isVertical = orientation === "vertical";

  return (
    <motion.div
      className={clsx(
        "absolute",
        isVertical ? "top-0 left-1/2 h-[110px] w-[2px] -translate-x-1/2" : "top-1/2 left-0 h-[2px] w-[110px] -translate-y-1/2",
      )}
      style={{
        background: isVertical
          ? "linear-gradient(to bottom, transparent, #fff, transparent)"
          : "linear-gradient(to right, transparent, #fff, transparent)",
        filter: "blur(1.5px)",
      }}
      animate={isVertical ? { top: ["-15%", "100%"] } : { left: ["-15%", "100%"] }}
      transition={{ duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />
  );
}

export function HLine({ className, delay }: { className: string; delay?: number }) {
  return (
    <Container className={clsx("pointer-events-none absolute h-px overflow-hidden bg-white/[0.24]", className)}>
      <GridLineLight orientation="horizontal" delay={delay} />
    </Container>
  );
}

export function VLine({ className, delay }: { className: string; delay?: number }) {
  return (
    <Container className={clsx("pointer-events-none absolute w-px overflow-hidden bg-white/[0.24]", className)}>
      <GridLineLight orientation="vertical" delay={delay} />
    </Container>
  );
}

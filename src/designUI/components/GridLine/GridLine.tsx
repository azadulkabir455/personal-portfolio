"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";

type GridLineTone = "light" | "dark";

const toneStyles = {
  light: { line: "bg-white/[0.24]", glow: "#fff" },
  dark: { line: "bg-[#242423]/12", glow: "#388EFF" },
};

export function GridLineLight({
  orientation,
  delay = 0,
  duration = 5.5,
  tone = "light",
}: {
  orientation: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
  tone?: GridLineTone;
}) {
  const isVertical = orientation === "vertical";
  const glow = toneStyles[tone].glow;

  return (
    <motion.div
      className={clsx(
        "absolute",
        isVertical ? "top-0 left-1/2 h-[110px] w-[2px] -translate-x-1/2" : "top-1/2 left-0 h-[2px] w-[110px] -translate-y-1/2",
      )}
      style={{
        background: isVertical
          ? `linear-gradient(to bottom, transparent, ${glow}, transparent)`
          : `linear-gradient(to right, transparent, ${glow}, transparent)`,
        filter: "blur(1.5px)",
      }}
      animate={isVertical ? { top: ["-15%", "100%"] } : { left: ["-15%", "100%"] }}
      transition={{ duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />
  );
}

export function HLine({ className, delay, tone = "light" }: { className: string; delay?: number; tone?: GridLineTone }) {
  return (
    <Container className={clsx("pointer-events-none absolute h-px overflow-hidden", toneStyles[tone].line, className)}>
      <GridLineLight orientation="horizontal" delay={delay} tone={tone} />
    </Container>
  );
}

export function VLine({ className, delay, tone = "light" }: { className: string; delay?: number; tone?: GridLineTone }) {
  return (
    <Container className={clsx("pointer-events-none absolute w-px overflow-hidden", toneStyles[tone].line, className)}>
      <GridLineLight orientation="vertical" delay={delay} tone={tone} />
    </Container>
  );
}

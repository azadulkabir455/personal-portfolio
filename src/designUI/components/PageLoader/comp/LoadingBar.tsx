"use client";

import { motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";

export default function LoadingBar({ isExiting }: { isExiting: boolean }) {
  return (
    <Container className="relative h-[4px] w-[160px] overflow-hidden rounded-full bg-white/20">
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-white"
        initial={{ width: "0%" }}
        animate={{ width: isExiting ? "100%" : "85%" }}
        transition={isExiting ? { duration: 0.3, ease: "easeOut" } : { duration: 1.6, ease: "easeOut" }}
      />
    </Container>
  );
}

"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { usePageLoader } from "./function";
import RocketIcon from "./comp/RocketIcon";
import FlameIcon from "./comp/FlameIcon";
import LoadingBar from "./comp/LoadingBar";
import Stars from "./comp/Stars";
import type { PageLoaderProps } from "./types";

const panelGradient = "linear-gradient(180deg, #000000 0%, #005CD6 50%, #FFFFFF 100%)";
const wipeTimes = [0, 0.08, 1];
const wipeEase = [0.4, 0, 0.2, 1] as const;
const wipeTransition = { duration: 1.6, times: wipeTimes, ease: wipeEase };

const smokePuffs = [
  { x: -28, size: 16, delay: 0 },
  { x: 22, size: 20, delay: 0.05 },
  { x: -12, size: 14, delay: 0.1 },
  { x: 30, size: 18, delay: 0.14 },
  { x: 0, size: 22, delay: 0.18 },
  { x: -34, size: 15, delay: 0.22 },
];

export default function PageLoader({ isLoading }: PageLoaderProps) {
  const { shouldRender, isExiting } = usePageLoader(isLoading);

  if (!shouldRender) return null;

  return (
    <Container className="fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ background: panelGradient }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? [1, 1, 0] : 1 }}
        transition={isExiting ? wipeTransition : { duration: 0.3 }}
      >
        <Stars />
      </motion.div>

      <Container className="absolute inset-x-0 bottom-[14%] z-10 flex flex-col items-center gap-6">
        <Container className="relative flex h-[120px] w-[70px] items-end justify-center">
          <motion.div
            className="absolute bottom-[4px] left-1/2 z-0 h-[10px] w-[10px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,209,102,0.55) 45%, rgba(255,255,255,0) 72%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isExiting ? { opacity: [0, 1, 0], scale: [0.5, 9, 11] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />

          {smokePuffs.map((puff, index) => (
            <motion.span
              key={index}
              className="absolute bottom-[6px] rounded-full bg-white/70"
              style={{ height: puff.size, width: puff.size }}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={
                isExiting
                  ? { opacity: [0.8, 0], scale: [0.4, 2.4], x: puff.x, y: 26 }
                  : { opacity: [0, 0.5, 0], scale: [0.3, 1, 1.5], x: [0, puff.x * 0.4], y: [0, 16] }
              }
              transition={
                isExiting
                  ? { duration: 0.8, delay: puff.delay, ease: "easeOut" }
                  : { duration: 1.1, repeat: Infinity, delay: puff.delay, ease: "easeOut" }
              }
            />
          ))}

          <motion.div
            className="absolute bottom-[10px] z-0 h-[26px] w-[18px]"
            style={{ transformOrigin: "50% 0%" }}
            animate={
              isExiting
                ? { scaleY: [1, 1.6, 0], opacity: [1, 1, 0] }
                : { scaleY: [0.8, 1.1, 0.85, 1], opacity: 1 }
            }
            transition={
              isExiting
                ? { duration: 0.5, ease: "easeIn" }
                : { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <FlameIcon className="h-full w-full" />
          </motion.div>

          <motion.div
            initial={{ y: 0 }}
            animate={
              isExiting
                ? { y: ["0vh", "1.5vh", "-140vh"], rotate: [0, 0, -2, 2, 0] }
                : { y: [0, -6, 0] }
            }
            transition={
              isExiting
                ? { duration: 1.6, times: [0, 0.08, 1], ease: [0.4, 0, 0.2, 1] }
                : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative z-10 h-[80px] w-[48px]"
          >
            <RocketIcon className="h-full w-full" />

            <motion.div
              className="absolute top-full left-1/2 w-[6px] -translate-x-1/2 rounded-full"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0))",
                transformOrigin: "top",
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={isExiting ? { height: 220, opacity: [0, 1, 0] } : { height: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </motion.div>
        </Container>

        <motion.div
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <Text
            className={clsx(
              sora.className,
              "font-sans text-[13px] font-semibold tracking-[0.3em] text-white uppercase",
            )}
          >
            Loading
          </Text>

          <LoadingBar isExiting={isExiting} />
        </motion.div>
      </Container>
    </Container>
  );
}

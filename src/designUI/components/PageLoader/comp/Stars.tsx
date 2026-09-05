"use client";

import { motion } from "framer-motion";

const stars = [
  { top: "18%", left: "20%", size: 2, delay: 0 },
  { top: "32%", left: "68%", size: 3, delay: 0.4 },
  { top: "12%", left: "48%", size: 2, delay: 0.8 },
  { top: "58%", left: "30%", size: 2, delay: 0.2 },
  { top: "70%", left: "72%", size: 3, delay: 0.6 },
  { top: "44%", left: "10%", size: 2, delay: 1 },
  { top: "24%", left: "84%", size: 2, delay: 0.3 },
];

export default function Stars() {
  return (
    <>
      {stars.map((star, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-white"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        />
      ))}
    </>
  );
}

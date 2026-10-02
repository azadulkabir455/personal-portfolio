"use client";

import clsx from "clsx";
import Icon from "@/designUI/elements/Icon/Icon";
import { useScrollToTop } from "./function";

const waveClassName = "absolute left-1/2 aspect-square w-[220%] -translate-x-1/2 transition-[top] duration-300 ease-out";

export default function ScrollToTop() {
  const { isVisible, progress, scrollToTop } = useScrollToTop();
  const isMostlyFilled = progress > 0.58;
  const liquidTop = `${(1 - progress) * 110 - 5}%`;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
      className={clsx(
        "group fixed z-40 flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white",
        "shadow-[0_8px_24px_-6px_rgba(0,92,214,0.45),0_2px_6px_rgba(36,36,35,0.08)]",
        "transition-[opacity,transform] duration-300",
        "right-[16px] bottom-[16px] h-[40px] w-[40px]",
        "md:right-[30px] md:bottom-[30px] md:h-[48px] md:w-[48px]",
        "lg:right-[50px] lg:bottom-[40px] lg:h-[56px] lg:w-[56px]",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span
        className={clsx(waveClassName, "animate-[spin_7s_linear_infinite] rounded-[38%] bg-[#8FBFFF]/60")}
        style={{ top: liquidTop }}
      />
      <span
        className={clsx(
          waveClassName,
          "mt-[3px] animate-[spin_5s_linear_infinite] rounded-[42%] bg-gradient-to-b from-[#64A6FF] to-[#005CD6]",
        )}
        style={{ top: liquidTop }}
      />
      <Icon
        name="FaArrowUp"
        width={16}
        height={16}
        color={isMostlyFilled ? "#F7F7F7" : "#005CD6"}
        className="relative z-10 transition-[color,transform] duration-300 group-hover:-translate-y-1"
      />
    </button>
  );
}

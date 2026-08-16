import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import { PlusIcon } from "@/designUI/utilities/icons";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { HeroContentCardProps } from "../types";

export default function HeroContentCard({
  children,
  className = "",
  ...props
}: HeroContentCardProps) {
  return (
    <Container
      {...props}
      className={clsx(
        "relative",
        "flex flex-col justify-center",
        "h-[221px] md:h-[258px] md:w-full lg:max-w-[365px]",
        "p-[12px] md:px-6 md:py-8",
        "overflow-hidden",
        "bg-gradient-to-b from-[rgba(231,241,255,0.05)] to-[rgba(187,216,255,0.05)]",
        className,
      )}
    >
      <PlusIcon
        color="#FFFF2E"
        className="absolute top-[8px] left-[8px] z-10 h-2 w-2 md:top-[15px] md:left-[15px] md:h-3 md:w-3"
      />
      <PlusIcon
        color="#FFFF2E"
        className="absolute top-[8px] right-[8px] z-10 h-2 w-2 md:top-[15px] md:right-[15px] md:h-3 md:w-3"
      />
      <PlusIcon
        color="#FFFF2E"
        className="absolute bottom-[8px] left-[8px] z-10 h-2 w-2 md:bottom-[15px] md:left-[15px] md:h-3 md:w-3"
      />
      <PlusIcon
        color="#FFFF2E"
        className="absolute right-[8px] bottom-[8px] z-10 h-2 w-2 md:right-[15px] md:bottom-[15px] md:h-3 md:w-3"
      />
      <Container className="relative z-10 flex flex-col items-start">
        {children}
      </Container>
    </Container>
  );
}

export const heroCardTextClassName = clsx(
  sora.className,
  "mb-[16px] md:mb-[24px]",
  "font-medium text-[14px] md:text-[16px] leading-[24px] md:leading-[26px]",
  "text-[#F7F7F7]",
);

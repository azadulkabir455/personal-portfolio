import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import { PlusIcon } from "@/designUI/utilities/icons";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { HeroContentCardProps } from "../types";

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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
        "backdrop-blur-md",
        className,
      )}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <Container
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: noiseTexture }}
      />
      <Container
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)" }}
      />

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

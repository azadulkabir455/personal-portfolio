import clsx from "clsx";
import Link from "@/designUI/elements/Link/Link";
import Container from "@/designUI/elements/Container/Container";
import { poppins } from "@/designUI/utilities/fonts/fonts";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import type { FooterCTAButtonProps } from "../types";

export default function FooterCTAButton({ label, href }: FooterCTAButtonProps) {
  const repeated = `${label} • `.repeat(2);

  return (
    <Link
      href={href}
      className="group relative hidden h-[150px] w-[150px] shrink-0 items-center justify-center lg:flex"
    >
      <svg
        viewBox="0 0 150 150"
        className="absolute inset-0 h-full w-full animate-[spin_10s_linear_infinite]"
      >
        <path
          id="footer-cta-circle"
          d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
          fill="none"
        />
        <text
          className={clsx(
            poppins.className,
            "fill-white text-[24.5px] leading-[32px] font-semibold tracking-[-0.5px]",
          )}
        >
          <textPath href="#footer-cta-circle" startOffset="0%">
            {repeated}
          </textPath>
        </text>
      </svg>

      <Container className="relative z-10 flex h-[92px] w-[92px] items-center justify-center rounded-[355px] bg-[#F9F9F91A] text-[18px] transition-transform duration-300 group-hover:scale-110">
        <ArrowUpRightIcon className="h-8 w-8" color="#FFFF2E" />
      </Container>
    </Link>
  );
}

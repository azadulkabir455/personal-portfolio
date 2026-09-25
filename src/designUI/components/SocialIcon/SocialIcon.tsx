import Link from "@/designUI/elements/Link/Link";
import Icon from "@/designUI/elements/Icon/Icon";
import type { SocialIconProps } from "./types";

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function SocialIcon({ icon, url }: SocialIconProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full text-white backdrop-blur-md transition-transform duration-200 hover:scale-105 md:h-10 md:w-10"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.16)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: noiseTexture }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }}
      />
      <Icon name={icon.name} width={icon.width} height={icon.height} className="relative z-10" />
    </Link>
  );
}

/*
<SocialIcon icon={{ name: "FaLinkedinIn" }} url="https://linkedin.com" />
*/

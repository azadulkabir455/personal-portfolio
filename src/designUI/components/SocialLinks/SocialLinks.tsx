import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Link from "@/designUI/elements/Link/Link";
import Icon from "@/designUI/elements/Icon/Icon";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { SocialLinksProps } from "./types";

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function SocialLinks({
  label,
  links,
  labelColorClassName = "text-[#F7F7F7]",
  iconColorClassName = "text-[#F7F7F7]",
}: SocialLinksProps) {
  return (
    <Container className="flex flex-col gap-[8px]">
      <Text
        className={clsx(
          sora.className,
          "font-medium tracking-[0px]",
          "text-[12px] leading-[18px]",
          "md:text-[16px] md:leading-[28px]",
          "lg:text-[18px] lg:leading-[30px]",
          labelColorClassName,
        )}
      >
        {label}
      </Text>
      <Container className="flex flex-wrap items-center gap-[4px] lg:gap-[8px]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "relative flex h-[28px] w-[28px] items-center justify-center overflow-hidden rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-105 lg:h-[40px] lg:w-[40px]",
              iconColorClassName,
            )}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            <Container
              className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
              style={{ backgroundImage: noiseTexture }}
            />
            <Container
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }}
            />
            <Icon name={link.icon.name} width="50%" height="50%" className="relative z-10" />
          </Link>
        ))}
      </Container>
    </Container>
  );
}

/*
<SocialLinks label={data.social.findMeLabel} links={data.social.links} />
*/

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Link from "@/designUI/elements/Link/Link";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { SocialLinksProps } from "./types";

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
              "flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#F9F9F91A] transition-colors duration-200 hover:bg-white/20 lg:h-[40px] lg:w-[40px]",
              iconColorClassName,
            )}
          >
            <link.icon className="h-[14px] w-[14px] lg:h-5 lg:w-5" />
          </Link>
        ))}
      </Container>
    </Container>
  );
}

/*
<SocialLinks label={data.social.findMeLabel} links={data.social.links} />
*/

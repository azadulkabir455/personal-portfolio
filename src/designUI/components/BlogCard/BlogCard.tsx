import clsx from "clsx";
import Link from "@/designUI/elements/Link/Link";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import Button from "@/designUI/elements/Button/Button";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import type { BlogCardProps } from "./types";

export default function BlogCard({ type, category, title, image, href, ctaLabel }: BlogCardProps) {
  return (
    <Link
      href={href}
      target={type === "external" ? "_blank" : undefined}
      rel={type === "external" ? "noopener noreferrer" : undefined}
      className={clsx(
        "group flex w-full flex-col md:h-full",
        "rounded-[12px] border border-[#2424231F] bg-white",
        "pt-[12px] pl-[12px] pb-[20px]",
        "md:pt-[16px] md:pl-[16px] md:pb-[20px]",
        "lg:rounded-[16px] lg:pt-[24px] lg:pl-[24px] lg:pb-[30px]",
      )}
    >
      <Container
        className="relative h-[147px] w-full overflow-hidden rounded-l-[12px] md:h-[121px] md:rounded-l-[8px] lg:h-[252px] lg:rounded-l-[16px]"
        style={{
          background:
            "radial-gradient(72.72% 47.64% at 56.17% 26.75%, #388EFF 0%, rgba(56, 142, 255, 0) 100%)",
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Container>

      <Container className="mt-[16px] flex flex-col pr-[12px] md:flex-1 md:justify-between md:pr-[16px] lg:pr-[24px]">
        <Text
          variant="h3"
          className={clsx(
            sora.className,
            "font-medium tracking-[0px] text-[#242423]",
            "text-[12px] leading-[20px]",
            "md:text-[14px] md:leading-[24px]",
            "lg:text-[24px] lg:leading-[32px]",
          )}
        >
          <span
            className={clsx(
              "float-left mt-[3px] mr-[16px] flex items-center font-semibold tracking-[0px] text-[#242423]",
              "text-[8px] leading-[12px]",
              "md:text-[10px] md:leading-[18px]",
            )}
          >
            <span className="px-[3px] text-[#388EFF]">[</span>
            {category}
            <span className="px-[3px] text-[#388EFF]">]</span>
          </span>
          {title}
        </Text>

        <Button
          as="span"
          variant="plain"
          className="mt-[12px] self-start text-[#242423] md:mt-[24px] lg:mt-[30px]"
          icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" color="#388EFF" />}
        >
          {ctaLabel}
        </Button>
      </Container>
    </Link>
  );
}

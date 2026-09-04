import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import Button from "@/designUI/elements/Button/Button";
import Link from "@/designUI/elements/Link/Link";
import { PlusIcon, ArrowUpRightIcon } from "@/designUI/utilities/icons";
import { sora } from "@/designUI/utilities/fonts/fonts";
import type { ProjectCardProps } from "./types";

export default function ProjectCard({
  title,
  description,
  tags,
  ctaLabel,
  ctaLink,
  image,
  reverse = false,
  secondaryCta,
}: ProjectCardProps) {
  return (
    <Container
      className={clsx(
        "flex w-full flex-col-reverse items-center gap-[16px] md:flex-row md:justify-between",
        reverse && "md:flex-row-reverse",
      )}
    >
      <Container className="flex flex-col md:max-w-[420px] lg:max-w-[355px]">
        <Text
          variant="h3"
          className={clsx(
            sora.className,
            "font-bold tracking-[0px] text-[#242423] capitalize",
            "text-[16px] leading-[24px]",
            "md:text-[24px] md:leading-[34px] md:min-h-[102px]",
            "lg:text-[32px] lg:leading-[44px] lg:min-h-[132px]",
          )}
        >
          {title}
        </Text>

        <Text className="mt-[8px] font-sans text-[12px] leading-[20px] font-light text-[#616161] md:text-[14px] md:leading-[18px]">
          {description}
        </Text>

        <Container className="mt-[8px] flex flex-wrap gap-x-[4px] gap-y-[4px] md:mt-[16px] md:gap-x-[12px] md:gap-y-[8px] lg:mt-[24px] lg:gap-x-[8px] lg:gap-y-[12px]">
          {tags.map((tag) => (
            <Text
              key={tag}
              className="rounded-[6px] bg-white px-[6px] py-[5px] font-sans text-[12px] leading-[20px] font-light text-[#242423] md:px-[8px] md:py-[5px] md:text-[14px] md:leading-[18px]"
            >
              {tag}
            </Text>
          ))}
        </Container>

        <Container className="mt-[16px] flex flex-wrap items-center gap-x-[24px] gap-y-[8px] md:mt-[20px] lg:mt-[30px]">
          {ctaLabel && ctaLink && (
            <Link href={ctaLink}>
              <Button
                as="span"
                variant="plain"
                className="self-start text-[#242423]"
                icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" color="#388EFF" />}
              >
                {ctaLabel}
              </Button>
            </Link>
          )}

          {secondaryCta && (
            <Link href={secondaryCta.href}>
              <Button
                as="span"
                variant="plain"
                className="self-start text-[#242423]"
                icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" color="#388EFF" />}
              >
                {secondaryCta.label}
              </Button>
            </Link>
          )}
        </Container>
      </Container>

      <Container className="relative shrink-0 p-[16px] md:p-[20px] lg:p-[22px]">
        <PlusIcon
          color="#388EFF"
          className="absolute top-0 left-0 z-10 h-[8px] w-[8px] md:h-[12px] md:w-[12px]"
        />
        <PlusIcon
          color="#388EFF"
          className="absolute top-0 right-0 z-10 h-[8px] w-[8px] md:h-[12px] md:w-[12px]"
        />
        <PlusIcon
          color="#388EFF"
          className="absolute bottom-0 left-0 z-10 h-[8px] w-[8px] md:h-[12px] md:w-[12px]"
        />
        <PlusIcon
          color="#388EFF"
          className="absolute right-0 bottom-0 z-10 h-[8px] w-[8px] md:h-[12px] md:w-[12px]"
        />
        <Container className="relative h-[229px] w-[288px] overflow-hidden rounded-[8px] md:h-[229px] md:w-[304px] md:rounded-[12px] lg:h-[319px] lg:w-[425px] lg:rounded-[16px]">
          <Image src={image} alt={title} fill className="object-cover" />
        </Container>
      </Container>
    </Container>
  );
}

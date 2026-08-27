import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import Button from "@/designUI/elements/Button/Button";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import type { CaseStudySlideProps } from "../types";

export default function CaseStudySlide({
  publishedLabel,
  publishedDate,
  title,
  description,
  ctaLabel,
  images,
  children,
}: CaseStudySlideProps) {
  return (
    <Container className="relative flex w-full flex-col overflow-hidden">
      <Image src={images.mobile} alt={title} fill priority className="block object-cover object-top md:hidden" />
      <Image src={images.tab} alt={title} fill priority className="hidden object-cover object-top md:block lg:hidden" />
      <Image src={images.desktop} alt={title} fill priority className="hidden object-cover object-top lg:block" />

      <Container className="container relative z-10 mx-auto flex w-full flex-col px-[16px] pt-[20px] pb-[30px] md:px-[40px] md:pt-[60px] md:pb-[40px] lg:px-[10px] lg:pt-[70px] lg:pb-[30px]">
        <Container className="flex max-w-[calc(80%+20px)] flex-col items-start md:max-w-[360px] lg:max-w-[calc(38%+20px)]">
          <Container className="flex flex-wrap items-baseline gap-x-[6px]">
            <Text
              className={clsx(
                "font-sans font-bold text-[#242423] capitalize",
                "text-[12px] leading-[18px] tracking-[0.13px]",
                "md:text-[14px] md:leading-[22px] md:tracking-[0.25px]",
              )}
            >
              {publishedLabel}
            </Text>
            <Text
              className={clsx(
                "font-sans font-medium text-[#616161] capitalize",
                "text-[12px] leading-[18px] tracking-[0.13px]",
                "md:text-[14px] md:leading-[18px] md:tracking-[0.25px]",
              )}
            >
              {publishedDate}
            </Text>
          </Container>

          <Container className="h-[205px] overflow-hidden lg:h-[290px]">
            <Text
              variant="h3"
              className={clsx(
                sora.className,
                "mt-[8px] font-bold tracking-[0px] text-[#242423] capitalize",
                "text-[16px] leading-[24px]",
                "md:text-[24px] md:leading-[34px]",
                "lg:text-[32px] lg:leading-[44px]",
              )}
            >
              {title}
            </Text>

            <Text
              className={clsx(
                "mt-[8px] font-sans font-light tracking-[0px] text-[#616161]",
                "text-[12px] leading-[20px]",
                "md:text-[14px] md:leading-[24px]",
                "lg:text-[16px] lg:leading-[26px]",
              )}
            >
              {description}
            </Text>
          </Container>
        </Container>

        <Container className="mt-[20px] flex max-w-[80%] justify-start md:mt-[10px] md:max-w-[48%] lg:mt-[80px] lg:max-w-[38%]">
          <Button icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}>{ctaLabel}</Button>
        </Container>

        <Container className="mt-[150px] flex w-full justify-center md:mt-0 md:pt-[160px] lg:mt-[135px] lg:pt-0">
          {children}
        </Container>
      </Container>
    </Container>
  );
}

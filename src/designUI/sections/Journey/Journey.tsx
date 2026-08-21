"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Button from "@/designUI/elements/Button/Button";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import { useJourney } from "./function";
import JourneyBackground from "./comp/JourneyBackground";
import JourneyGridLines from "./comp/JourneyGridLines";
import JourneyStepItem from "./comp/JourneyStepItem";
import JourneyToolBadge from "./comp/JourneyToolBadge";
import JourneyCertificateCarousel from "./comp/JourneyCertificateCarousel";

const toolkitTitleClassName = clsx(
  "font-sans font-bold capitalize align-middle tracking-[0.13px] text-[#242423]",
  "text-[12px] leading-[18px]",
  "md:text-[14px] md:leading-[22px] md:tracking-[0.25px]",
);

export default function Journey() {
  const { data } = useJourney();

  return (
    <Container variant="section" id="journey" className="relative w-full">
      <JourneyBackground />

      <Container
        className={clsx(
          "container relative z-10",
          "px-4 pb-[20px]",
          "md:px-[40px] md:pb-[40px]",
          "lg:px-0 lg:pb-[80px]",
        )}
      >
        <Container
          className={clsx(
            "relative",
            "pt-[20px] pb-6",
            "md:pt-[40px]",
            "lg:pt-[80px]",
          )}
        >
          <JourneyGridLines />

          <Container className="relative flex flex-col gap-[12px] md:gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-[30px]">
            <Container className="relative lg:w-1/3 lg:shrink-0">
              <Text
                className={clsx(
                  sora.className,
                  "inline-block text-left align-middle font-semibold tracking-[1.25px] text-[#388EFF]",
                  "rounded-[100px] bg-white px-[12px] py-[5px]",
                  "text-[10px] leading-[15px]",
                  "md:text-[12px] md:leading-[18px]",
                )}
              >
                {data.intro.preHeader}
              </Text>
            </Container>

            <Container className="relative flex flex-col items-start gap-[16px] md:gap-6 lg:w-2/3">
              <Text
                className={clsx(
                  "block indent-[55px] align-middle font-medium tracking-[0px]",
                  "text-[12px] leading-[20px]",
                  "md:text-[14px] md:leading-[24px]",
                  "lg:text-[16px] lg:leading-[26px]",
                )}
              >
                <span className="text-[#242423]">
                  {data.intro.paragraphPrimary} {data.intro.paragraphSecondary}
                </span>
              </Text>

              <Button icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}>
                {data.intro.ctaLabel}
              </Button>
            </Container>
          </Container>

          <Text
            variant="h3"
            className={clsx(
              sora.className,
              "pt-[20px] align-middle font-medium tracking-[0px] text-[#242423] capitalize md:pt-[40px] lg:pt-[80px]",
              "text-[16px] leading-[24px]",
              "md:text-[24px] md:leading-[32px]",
            )}
          >
            {data.intro.subHeading}
          </Text>
        </Container>

        <Container
          className={clsx(
            "rounded-[8px] bg-[#FFFFFFD9]",
            "px-[16px] py-[20px]",
            "md:px-[34px] md:py-[30px]",
            "lg:px-[60px] lg:py-[60px]",
          )}
        >
          <Container className="flex flex-col gap-[20px] md:gap-[60px]">
            {data.steps.map((step) => (
              <JourneyStepItem key={step.step} {...step} />
            ))}
          </Container>
        </Container>

        <Container className="mt-[20px] md:mt-[40px] lg:mt-[60px]">
          <Text className={toolkitTitleClassName}>{data.toolkit.toolsTitle}</Text>

          <Container className="mt-[12px] border-b border-[#242423]/24 md:mt-[16px]" />

          <Container className="mt-[16px] flex flex-wrap items-center gap-[4px] md:mt-[24px] md:gap-[8px]">
            {data.toolkit.tools.map((tool) => (
              <JourneyToolBadge key={tool.name} {...tool} />
            ))}
          </Container>
        </Container>

        <Container className="mt-6">
          <Text className={toolkitTitleClassName}>{data.toolkit.certificationsTitle}</Text>

          <Container className="mt-[12px] border-b border-[#242423]/24 md:mt-[16px]" />

          <Container className="mt-[16px] md:mt-[24px]">
            <JourneyCertificateCarousel certificates={data.toolkit.certificates} />
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

"use client";

import { Fragment } from "react";
import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import { PlusIcon, DoubleArrowIcon, TrendingUpIcon } from "@/designUI/utilities/icons";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { useStory } from "./function";
import ProcessPill from "./comp/ProcessPill";
import StatItem from "./comp/StatItem";

export default function Story() {
  const { data } = useStory();

  return (
    <Container
      variant="section"
      id="story"
      className="container relative px-0 py-[40px] md:px-0 lg:scroll-mt-[140px] lg:px-[10px]"
    >
      <Container className="relative flex flex-col gap-0">
        <Container className="relative mb-0 flex flex-col gap-0 md:flex-row md:items-start md:justify-between md:gap-[20px]">
          <Container className="relative md:absolute md:top-0 md:left-0 md:h-[300px] md:w-full lg:relative lg:w-1/4 lg:shrink-0">
            <Text
              variant="h2"
              className={clsx(
                sora.className,
                "relative z-10 pl-[16px] text-left align-middle font-semibold tracking-[1.25px] text-[#388EFF]",
                "text-[10px] leading-[15px]",
                "md:absolute md:w-full md:pl-[40px] md:text-[12px] md:leading-[18px]",
                "lg:relative lg:w-auto lg:pl-0",
              )}
            >
              {data.title}
            </Text>
            <Image
              src="/images/story/globe.png"
              alt=""
              width={320}
              height={320}
              className="pointer-events-none absolute -top-[5px] left-[16px] block w-[200px] max-w-none opacity-60 md:left-[-60px] md:w-[400px] md:translate-x-0 lg:left-1/2 lg:w-[200%] lg:-translate-x-[calc(50%+15px)]"
            />
          </Container>

          <Container
            className={clsx(
              "relative z-20 flex flex-col gap-0 px-[16px] py-[20px] md:w-full md:max-w-full lg:max-w-[790px]",
              "md:grid md:grid-cols-2 md:items-start md:gap-x-[24px] md:p-[40px]",
              "lg:flex lg:flex-col lg:gap-0 lg:p-0",
            )}
          >
            <Text
              className={clsx(
                sora.className,
                "mb-[16px] block indent-[55px] align-middle font-medium tracking-[0px] text-[#242423] md:mb-6",
                "text-[12px] leading-[20px]",
                "md:text-[14px] md:leading-[26px]",
                "lg:text-[16px] lg:leading-[26px]",
              )}
            >
              {data.description}
            </Text>

            <Container className="flex flex-col gap-0">
              <Text
                className={clsx(
                  "font-sans font-bold capitalize align-middle tracking-[0.25px] text-[#242423]",
                  "text-[12px] leading-[18px]",
                  "md:text-[14px] md:leading-[22px]",
                )}
              >
                {data.clientLogosHeading}
              </Text>
              <Container className="mt-[12px] mb-4 border-b border-[#242423]/12 md:mt-4" />
              <Container className="flex flex-wrap items-center justify-start gap-x-[30px] gap-y-[12px] md:gap-y-[16px]">
                {data.clientLogos.map((logo) => (
                  <Image
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={logo.height}
                    style={{ "--logo-height": `${logo.height}px` } as React.CSSProperties}
                    className="h-[calc(var(--logo-height)*0.85)] w-auto object-contain md:h-[var(--logo-height)]"
                  />
                ))}
              </Container>
            </Container>
          </Container>
        </Container>

        <Container className="relative z-30 mb-[20px] flex flex-wrap items-center justify-between px-[16px] md:mb-[40px] md:px-[40px] lg:mb-[80px] lg:px-0">
          {data.processSteps.map((step, index) => (
            <Fragment key={step.label}>
              <ProcessPill
                className={step.className}
                image={step.image}
                icon={
                  step.icon && (
                    <TrendingUpIcon className="h-[10px] w-[10px] md:h-[16px] md:w-[16px] lg:h-6 lg:w-6" />
                  )
                }
              >
                {step.label}
              </ProcessPill>
              {index < data.processSteps.length - 1 && (
                <DoubleArrowIcon className="h-[10px] w-[10px] md:h-[16px] md:w-[16px] lg:h-6 lg:w-6" />
              )}
            </Fragment>
          ))}
        </Container>

        <Container className="grid grid-cols-1 gap-[16px] px-[16px] md:grid-cols-[auto_1fr] md:items-center md:gap-[24px] md:px-[40px] lg:gap-[50px] lg:px-0">
          <Container className="relative p-1.5 md:p-2">
            <Container className="relative h-[165px] w-full md:h-[193px] md:w-[202px] lg:h-[211px] lg:w-[425px]">
              <Container className="absolute inset-[8px] overflow-hidden rounded-[4px] md:rounded-[8px] lg:rounded-[12px]">
                <Image src={data.statsImageUrl} alt="" fill className="object-cover" />
              </Container>
              <PlusIcon
                color="#388EFF"
                className="absolute -top-1.5 -left-1.5 h-2 w-2 md:-top-2 md:-left-2 md:h-3 md:w-3"
              />
              <PlusIcon
                color="#388EFF"
                className="absolute -top-1.5 -right-1.5 h-2 w-2 md:-top-2 md:-right-2 md:h-3 md:w-3"
              />
              <PlusIcon
                color="#388EFF"
                className="absolute -bottom-1.5 -left-1.5 h-2 w-2 md:-bottom-2 md:-left-2 md:h-3 md:w-3"
              />
              <PlusIcon
                color="#388EFF"
                className="absolute -right-1.5 -bottom-1.5 h-2 w-2 md:-right-2 md:-bottom-2 md:h-3 md:w-3"
              />
            </Container>
          </Container>

          <Container
            className={clsx(
              "flex flex-col gap-[16px] bg-white",
              "p-[16px]",
              "md:flex-row md:gap-[24px] md:p-[24px]",
              "lg:flex-col lg:gap-[60px] lg:px-[30px] lg:py-[35px]",
            )}
          >
            {data.stats.map((stat, index) => (
              <Fragment key={stat.label}>
                <StatItem {...stat} />
                {index < data.stats.length - 1 && (
                  <Container
                    className={clsx(
                      "-mx-[16px] w-auto border-t border-[#242423]/12",
                      "md:-my-[24px] md:mx-0 md:w-0 md:self-stretch md:border-t-0 md:border-l",
                      "lg:-mx-[30px] lg:w-auto lg:border-l-0 lg:border-t",
                    )}
                  />
                )}
              </Fragment>
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

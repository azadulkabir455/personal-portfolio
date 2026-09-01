"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { sora } from "@/designUI/utilities/fonts/fonts";
import ProjectCard from "@/designUI/components/ProjectCard/ProjectCard";
import { useProjects } from "./function";

const GRID_LINE_POSITIONS = ["0%", /* "33.333%", "66.666%", */ "100%"];

export default function Projects() {
  const { data } = useProjects();

  return (
    <Container variant="section" className="w-full">
      <Container className="relative mx-[5px] overflow-hidden rounded-[8px] bg-white md:mx-[10px] lg:rounded-[12px]">
        <Container className="container mx-auto px-[20px] pt-[24px] pb-[24px] md:px-[50px] md:pt-[40px] lg:px-[20px] lg:pt-[80px]">
          <Container className="relative flex flex-col gap-[12px] md:gap-[24px] lg:flex-row lg:items-start lg:justify-between lg:gap-[30px]">
            <Container className="relative lg:w-1/3 lg:shrink-0">
              <Text
                className={clsx(
                  sora.className,
                  "inline-block text-left align-middle font-semibold tracking-[1.25px] text-[#388EFF]",
                  "rounded-[100px] bg-[#F7F7F7] px-[12px] py-[5px]",
                  "text-[10px] leading-[15px]",
                  "md:text-[12px] md:leading-[18px]",
                )}
              >
                {data.intro.badge}
              </Text>
            </Container>

            <Text
              className={clsx(
                sora.className,
                "block indent-[55px] align-middle font-medium tracking-[0px] text-[#242423] lg:w-2/3",
                "text-[12px] leading-[20px]",
                "md:text-[14px] md:leading-[24px]",
                "lg:text-[16px] lg:leading-[26px]",
              )}
            >
              {data.intro.description}
            </Text>
          </Container>
        </Container>

        <Container className="relative w-full border-t border-[#2424231F]">
          <Container className="pointer-events-none absolute inset-y-0 inset-x-[16px] mx-auto max-w-[980px] md:inset-x-[40px] lg:inset-x-0">
            {GRID_LINE_POSITIONS.map((left) =>
              left === "100%" ? (
                <Container key={left} className="absolute top-0 right-0 bottom-0 z-0 w-px bg-[#2424231F]" />
              ) : (
                <Container key={left} className="absolute top-0 bottom-0 z-0 w-px bg-[#2424231F]" style={{ left }} />
              ),
            )}
          </Container>

          <Container className="relative">
            {data.projects.map((project, index) => (
              <Container key={project.title} className="relative w-full">
                {index > 0 && <Container className="h-0 w-full border-t border-[#2424231F]" />}
                <Container className="mx-auto max-w-[980px] px-[10px] py-[24px] md:py-[40px] lg:py-[60px]">
                  <ProjectCard {...project} />
                </Container>
              </Container>
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

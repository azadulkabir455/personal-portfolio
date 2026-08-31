"use client";

import { Fragment } from "react";
import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Button from "@/designUI/elements/Button/Button";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { ArrowUpRightIcon } from "@/designUI/utilities/icons";
import ProjectCard from "@/designUI/components/ProjectCard/ProjectCard";
import { useFeaturedProjects } from "./function";

const NUMBER_OFFSET_LG_CLASSES = [
  "ml-0",
  "ml-[20px] md:ml-[30px]",
  "ml-[40px] md:ml-[60px]",
  "ml-[60px] md:ml-[90px]",
];
export default function FeaturedProjects() {
  const { data } = useFeaturedProjects();

  return (
    <Container variant="section" id="featured-projects" className="relative w-full lg:scroll-mt-[140px]">
      <div className="relative w-full bg-[#f7f7f7]">
        <Container
          className={clsx(
            "container relative",
            "px-4 py-[20px]",
            "md:px-[40px] md:py-[40px]",
            "lg:px-[10px] lg:py-[80px]",
          )}
        >
          <Container className="relative flex flex-col gap-[12px] md:gap-[24px] lg:flex-row lg:items-start lg:justify-between lg:gap-[30px]">
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

        <Container
          className="relative ml-[calc(50%-50vw)] h-0 w-screen border-t border-[#242423]/12"
          style={{ zIndex: data.projects.length + 10 }}
        />
      </div>

      <div className="relative w-full">
        {data.projects.map((project, index) => (
          <Fragment key={project.title}>
            <div className="sticky top-0 w-full lg:top-[115px]" style={{ zIndex: index + 1 }}>
              {index > 0 && (
                <div
                  className="relative ml-[calc(50%-50vw)] h-0 w-screen border-t border-[#242423]/12"
                  style={{ zIndex: data.projects.length + 10 }}
                />
              )}
              <Container className={clsx("container relative", "px-4", "md:px-[40px]", "lg:px-[10px]")}>
                <Container className="relative flex w-full flex-col items-start gap-[12px] md:gap-[24px] lg:flex-row lg:justify-between min-[1024px]:max-[1130px]:bg-[#f7f7f7]">
                  <Container
                    className={clsx(
                      "flex flex-col items-start",
                      "pt-[20px] md:pt-[30px] lg:pt-[60px]",
                      NUMBER_OFFSET_LG_CLASSES[index],
                    )}
                  >
                    <Container className="relative flex flex-col items-start">
                      <Container className="absolute bottom-full left-0 hidden w-px bg-[#242423]/20 lg:block lg:h-[60px]" />
                      <Text
                        className={clsx(
                          sora.className,
                          "inline-block w-fit shrink-0 font-semibold tracking-[0px] text-[#242423]",
                          "text-[8px] leading-[12px]",
                          "md:text-[10px] md:leading-[18px]",
                        )}
                      >
                        {`//${index + 1}`}
                      </Text>
                    </Container>
                  </Container>

                  <Container
                    className={clsx(
                      "min-w-0 max-w-[980px] flex-1 bg-[#f7f7f7]",
                      "py-[20px]",
                      "md:py-[30px]",
                      "lg:-mt-[10px] lg:py-[60px]",
                    )}
                  >
                    <ProjectCard {...project} />
                  </Container>
                </Container>
              </Container>
            </div>
          </Fragment>
        ))}
      </div>

      <div
        className="sticky top-0 w-full bg-[#f7f7f7] lg:top-[115px]"
        style={{ zIndex: data.projects.length + 1 }}
      >
        <Container
          className={clsx(
            "container relative flex w-full justify-center",
            "px-4 py-[16px]",
            "md:px-[40px] md:py-[30px]",
            "lg:px-[10px] lg:py-[60px]",
          )}
        >
          <Button icon={<ArrowUpRightIcon className="h-[9px] w-[9px] md:h-3 md:w-3" />}>
            {data.cta.label}
          </Button>
        </Container>
      </div>
    </Container>
  );
}

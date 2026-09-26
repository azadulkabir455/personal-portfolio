"use client";

import { Fragment } from "react";
import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { useDragMarquee } from "@/customHooks/useDragMarquee";
import { useRecentDesign } from "./function";
import RecentDesignSlide from "./comp/RecentDesignSlide";
import RecentDesignShape from "./comp/RecentDesignShape";

export default function RecentDesign() {
  const { data } = useRecentDesign();
  const track = [...data.groups, ...data.groups];
  const trackRef = useDragMarquee(45);

  return (
    <Container
      variant="section"
      id="recent-design"
      className="w-full overflow-hidden pb-[20px] md:pb-[40px] lg:pb-[80px]"
    >
      <Text
        data-reveal
        className={clsx(
          "block text-center font-sans font-light tracking-[0px] text-[#242423]",
          "text-[14px] leading-[18px]",
          "md:text-[16px] md:leading-[26px]",
          "lg:text-[16px] lg:leading-[26px]",
        )}
      >
        {data.intro.text}
      </Text>

      <Container data-reveal="1" className="relative mt-[20px] overflow-hidden md:mt-[30px] lg:mt-[40px]">
        <div
          ref={trackRef}
          className="flex w-max cursor-grab touch-pan-y items-center gap-[3px] select-none active:cursor-grabbing md:gap-[5.5px] lg:gap-[10px]"
        >
          {track.map((group, index) => (
            <Fragment key={`${group.images[0]?.src}-${index}`}>
              <RecentDesignSlide {...group} />
              <RecentDesignShape reversed={index % 2 === 1} />
            </Fragment>
          ))}
        </div>
      </Container>
    </Container>
  );
}

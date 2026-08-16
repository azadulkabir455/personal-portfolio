"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import { useFeature } from "./function";
import FeatureLink from "./comp/FeatureLink";

export default function Feature() {
  const { data } = useFeature();

  return (
    <Container variant="section" className="w-full border-b border-[#242423]/12">
      <Container
        className={clsx(
          "container",
          "flex flex-col gap-4",
          "px-4 py-5 md:p-10",
          "md:flex-row md:items-center md:justify-between md:gap-0",
          "lg:px-[10px]",
        )}
      >
        {data.links.map((link) => (
          <FeatureLink key={link.label} {...link} />
        ))}
      </Container>
    </Container>
  );
}

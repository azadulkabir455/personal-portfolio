"use client";

import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { useLandingSectionsList } from "./function";
import LandingSectionCard from "./comp/LandingSectionCard";

export default function LandingSectionsList() {
  const { sections, enabledMap, toggle } = useLandingSectionsList();

  return (
    <Container className="flex flex-col gap-6">
      <Container className="flex flex-col gap-1">
        <Text variant="h1" className="font-sans text-[22px] font-semibold text-[#171717] md:text-[26px]">
          Home Page Sections
        </Text>
        <Text className="font-sans text-[13px] text-[#8A8A86] md:text-[14px]">
          Turn a section off to hide it from the live site.
        </Text>
      </Container>

      <Container className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <LandingSectionCard
            key={section.key}
            section={section}
            enabled={enabledMap[section.key]}
            onToggle={toggle}
          />
        ))}
      </Container>
    </Container>
  );
}

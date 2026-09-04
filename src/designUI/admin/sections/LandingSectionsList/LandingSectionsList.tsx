"use client";

import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { useLandingSectionsList } from "./function";
import LandingSectionCard from "./comp/LandingSectionCard";

export default function LandingSectionsList() {
  const { sections, enabledMap, toggle } = useLandingSectionsList();

  return (
    <Container className="flex w-full flex-col gap-6 rounded-[16px] border border-[#E4E4E4] bg-white p-4 lg:gap-8 lg:p-10">
      <Container className="flex flex-col gap-1.5 border-b border-[#E4E4E4] pb-4 lg:gap-2 lg:pb-6">
        <Text variant="h2" className="font-sans text-[18px] font-semibold text-[#171717] lg:text-[24px]">
          Sections
        </Text>
        <Text className="font-sans text-[12px] text-[#8A8A86] lg:text-[14px]">
          Enable or disable landing page sections and jump to their editors.
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

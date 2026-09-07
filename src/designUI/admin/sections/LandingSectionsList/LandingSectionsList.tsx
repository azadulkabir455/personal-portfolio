"use client";

import Container from "@/designUI/elements/Container/Container";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import { useLandingSectionsList } from "./function";
import LandingSectionCard from "./comp/LandingSectionCard";

export default function LandingSectionsList() {
  const { sections, enabledMap, toggle } = useLandingSectionsList();

  return (
    <FormContainer
      title="Sections"
      description="Enable or disable landing page sections and jump to their editors."
    >
      <Container className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <LandingSectionCard
            key={section.key}
            section={section}
            enabled={enabledMap[section.key]}
            onToggle={toggle}
          />
        ))}
      </Container>
    </FormContainer>
  );
}

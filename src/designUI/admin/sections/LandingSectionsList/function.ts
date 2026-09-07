"use client";

import { useState } from "react";
import {
  landingSections,
  defaultSectionVisibility,
} from "@/designUI/admin/utilities/content/landingSections";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";

export function useLandingSectionsList() {
  const { data } = useSectionContent("homeSections", defaultSectionVisibility);
  const [enabledMap, setEnabledMap] = useState(defaultSectionVisibility);
  const [syncedData, setSyncedData] = useState(data);
  const { run } = useSaveStatus();

  if (data !== syncedData) {
    setSyncedData(data);
    setEnabledMap(data);
  }

  const toggle = (key: string) => {
    const updated = { ...enabledMap, [key]: !enabledMap[key] };
    setEnabledMap(updated);
    run(() => saveSectionContent("homeSections", updated));
  };

  return { sections: landingSections, enabledMap, toggle };
}

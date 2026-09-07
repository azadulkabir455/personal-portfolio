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
  const { status, run } = useSaveStatus();

  if (data !== syncedData) {
    setSyncedData(data);
    setEnabledMap(data);
  }

  const toggle = (key: string) => {
    setEnabledMap((current) => ({ ...current, [key]: !current[key] }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    run(() => saveSectionContent("homeSections", enabledMap));
  };

  return { sections: landingSections, enabledMap, toggle, onSubmit, status };
}

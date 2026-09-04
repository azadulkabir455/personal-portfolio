"use client";

import { useState } from "react";
import { landingSections } from "@/designUI/admin/utilities/content/landingSections";

export function useLandingSectionsList() {
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(landingSections.map((section) => [section.key, true])),
  );

  const toggle = (key: string) => {
    setEnabledMap((current) => ({ ...current, [key]: !current[key] }));
  };

  return { sections: landingSections, enabledMap, toggle };
}

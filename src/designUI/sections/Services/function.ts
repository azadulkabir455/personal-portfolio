"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { servicesContent } from "@/designUI/utilities/content/services";

export function useServices() {
  return useSectionContent("services", servicesContent);
}

"use client";

import { useSectionContent } from "@/customHooks/useSectionContent";
import { footerContent } from "@/designUI/utilities/content/footer";

export function useFooter() {
  return useSectionContent("footer", footerContent);
}

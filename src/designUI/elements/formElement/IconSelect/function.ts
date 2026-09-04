import * as FaIcons from "react-icons/fa";
import type { IconName } from "@/designUI/elements/Icon/types";

const iconNames = Object.keys(FaIcons) as IconName[];
const resultLimit = 120;

export function filterIconNames(query: string): IconName[] {
  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? iconNames.filter((name) => name.toLowerCase().includes(normalized))
    : iconNames;

  return matches.slice(0, resultLimit);
}

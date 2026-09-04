import type { IconName } from "@/designUI/elements/Icon/types";

export interface IconSelectProps {
  id: string;
  label: string;
  value?: IconName | "";
  onChange: (name: IconName) => void;
  error?: string;
  containerClassName?: string;
}

import type { IconName } from "@/designUI/elements/Icon/types";

export interface SocialIconConfig {
  name: IconName;
  width?: number | string;
  height?: number | string;
}

export interface SocialIconProps {
  icon: SocialIconConfig;
  url: string;
}

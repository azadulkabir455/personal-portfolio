import type * as FaIcons from "react-icons/fa";

export type IconName = keyof typeof FaIcons;

export interface IconProps {
  name: IconName;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

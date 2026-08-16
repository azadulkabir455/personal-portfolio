import clsx from "clsx";
import * as FaIcons from "react-icons/fa";
import type { IconProps } from "./types";

export default function Icon({ name, width, height, color, className = "" }: IconProps) {
  const IconComponent = FaIcons[name];
  const hasExplicitSize = width !== undefined || height !== undefined;

  return (
    <IconComponent
      color={color}
      className={clsx(!hasExplicitSize && "h-5 w-5 md:h-6 md:w-6", className)}
      style={hasExplicitSize ? { width, height: height ?? width } : undefined}
    />
  );
}

/*
<Icon name="FaLinkedinIn" width={16} height={16} color="#F7F7F7" className="shrink-0" />
*/

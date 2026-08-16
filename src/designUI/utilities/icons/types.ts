import type { SVGAttributes } from "react";

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "width" | "height" | "color"> {
  width?: number;
  height?: number;
  color?: string;
}

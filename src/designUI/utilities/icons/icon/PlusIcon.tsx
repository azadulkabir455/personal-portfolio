import type { IconProps } from "../types";

export default function PlusIcon({
  width = 12,
  height = 12,
  color = "#FFFF2E",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.5 5.5H12V6.5H6.5V12H5.5V6.5H0V5.5H5.5V0H6.5V5.5Z"
        fill={color}
        stroke={color}
        strokeMiterlimit="10"
      />
    </svg>
  );
}

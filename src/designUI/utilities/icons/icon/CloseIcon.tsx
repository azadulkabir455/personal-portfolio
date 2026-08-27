import type { IconProps } from "../types";

export default function CloseIcon({
  width = 12,
  height = 12,
  color = "#388EFF",
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
        d="M1 1L11 11M11 1L1 11"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

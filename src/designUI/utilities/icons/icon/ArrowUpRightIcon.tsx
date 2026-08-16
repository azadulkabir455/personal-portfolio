import type { IconProps } from "../types";

export default function ArrowUpRightIcon({
  width = 12.95,
  height = 12.95,
  color = "#388EFF",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.7918 3.67662L1.52277 12.9457L0 11.4229L9.268 2.15385H1.09954V0H12.9457V11.8462H10.7918V3.67662Z"
        fill={color}
      />
    </svg>
  );
}

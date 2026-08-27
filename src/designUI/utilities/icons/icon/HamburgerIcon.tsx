import type { IconProps } from "../types";

export default function HamburgerIcon({
  width = 17,
  height = 7,
  color = "#388EFF",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.832031 0.833008H15.832M0.832031 5.83301H15.832"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

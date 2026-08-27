import type { IconProps } from "../types";

export default function ArrowRightIcon({
  width = 18,
  height = 17,
  color = "#F7F7F7",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.1093 9.45339L0.000896654 9.4534L0.000898087 7.29988L13.1086 7.29912L7.33262 1.52315L8.85561 0.000145895L17.2321 8.37663L8.8556 16.7531L7.3326 15.2301L13.1093 9.45339Z"
        fill={color}
      />
    </svg>
  );
}

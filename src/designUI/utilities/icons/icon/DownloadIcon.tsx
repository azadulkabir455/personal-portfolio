import type { IconProps } from "../types";

export default function DownloadIcon({
  width = 15,
  height = 16,
  color = "#388EFF",
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.800781 11.2008V12.8008C0.800781 13.2251 0.969352 13.6321 1.26941 13.9322C1.56947 14.2322 1.97643 14.4008 2.40078 14.4008H12.0008C12.4251 14.4008 12.8321 14.2322 13.1322 13.9322C13.4322 13.6321 13.6008 13.2251 13.6008 12.8008V11.2008M11.2008 6.40078L7.20078 10.4008L3.20078 6.40078M7.20078 10.4008V0.800781"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

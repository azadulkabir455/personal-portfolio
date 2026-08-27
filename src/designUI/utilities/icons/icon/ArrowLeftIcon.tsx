import type { IconProps } from "../types";

export default function ArrowLeftIcon({
  width = 18,
  height = 17,
  color = "#616161",
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
        d="M4.12113 7.30052L17.2296 7.3005L17.2296 9.45402L4.12188 9.45479L9.89785 15.2308L8.37485 16.7538L-0.00162588 8.37728L8.37487 0.000784539L9.89787 1.52378L4.12113 7.30052Z"
        fill={color}
      />
    </svg>
  );
}

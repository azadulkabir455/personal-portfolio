import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import type { ButtonVariant, ButtonProps } from "./types";

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    "gap-4 pl-8 bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)] text-[#F7F7F7]",
  plain: "gap-1 bg-transparent text-neutral-900",
};

export default function Button({
  variant = "filled",
  icon,
  className = "",
  iconClassName = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "group inline-flex items-center",
        "h-[38px] md:h-[52px]",
        "rounded-full",
        "text-center font-sans text-[12px] md:text-[14px] leading-[18px] md:leading-[22px] font-bold tracking-[0.13px] md:tracking-[0.25px] capitalize",
        "cursor-pointer transition-colors duration-200",
        variant === "filled" && !icon && "pr-8",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon && (
        <Container
          variant="span"
          className={clsx(
            "relative",
            "m-1",
            "flex items-center justify-center",
            "h-[30px] w-[30px] md:h-10 md:w-10",
            "overflow-hidden rounded-full",
            "bg-white",
            iconClassName,
          )}
        >
          <Container
            variant="span"
            className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0"
          >
            {icon}
          </Container>
          <Container
            variant="span"
            className="absolute inset-0 flex -translate-x-2 translate-y-2 items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {icon}
          </Container>
        </Container>
      )}
    </button>
  );
}


/* 
<Button variant="filled" icon={<ArrowIcon />}>
  Let's Talk Now
</Button>
<Button variant="plain" icon={<ArrowIcon />}>
  View Details
</Button> 
*/


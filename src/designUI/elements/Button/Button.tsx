import type { ElementType } from "react";
import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import type { ButtonVariant, ButtonProps } from "./types";

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    "h-[38px] md:h-[52px] gap-4 pl-8 bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)] text-[#F7F7F7]",
  plain: "h-auto gap-[12px] bg-transparent",
};

const variantIconWrapperClasses: Record<ButtonVariant, string> = {
  filled: "m-1 h-[30px] w-[30px] overflow-hidden rounded-full bg-white md:h-10 md:w-10",
  plain: "",
};

export default function Button({
  variant = "filled",
  as = "button",
  icon,
  className = "",
  iconClassName = "",
  iconMotion = "diagonal",
  children,
  ...props
}: ButtonProps) {
  const Tag = as as ElementType;

  return (
    <Tag
      className={clsx(
        "group inline-flex items-center",
        "rounded-full",
        "text-center font-sans text-[12px] md:text-[14px] leading-[18px] md:leading-[22px] font-bold tracking-[0.13px] md:tracking-[0.25px] capitalize",
        as === "button" && "cursor-pointer",
        "transition-colors duration-200",
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
            "relative flex items-center justify-center",
            variantIconWrapperClasses[variant],
            iconClassName,
          )}
        >
          <Container
            variant="span"
            className={clsx(
              "flex items-center justify-center transition-all duration-300 group-hover:opacity-0",
              iconMotion === "diagonal" && "group-hover:translate-x-2 group-hover:-translate-y-2",
              iconMotion === "vertical" && "group-hover:-translate-y-2",
            )}
          >
            {icon}
          </Container>
          <Container
            variant="span"
            className={clsx(
              "absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
              iconMotion === "diagonal" && "-translate-x-2 translate-y-2",
              iconMotion === "vertical" && "translate-y-2",
            )}
          >
            {icon}
          </Container>
        </Container>
      )}
    </Tag>
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


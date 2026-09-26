import type { ElementType } from "react";
import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import type { ButtonVariant, ButtonTone, ButtonProps } from "./types";

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    "h-[38px] md:h-[52px] gap-4 pl-8 bg-[radial-gradient(914.34%_212.5%_at_44.16%_14.42%,#242423_0%,#8A8A86_100%)] text-[#F7F7F7]",
  plain: "h-auto gap-[12px] bg-transparent",
};

const toneGlows: Record<ButtonTone, { soft: string; strong: string }> = {
  light: { soft: "rgba(255,255,255,0.9)", strong: "#fff" },
  dark: { soft: "rgba(56,142,255,0.9)", strong: "#388EFF" },
};

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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
  tone = "light",
  children,
  ...props
}: ButtonProps) {
  const Tag = as as ElementType;
  const glow = toneGlows[tone];

  return (
    <Tag
      className={clsx(
        "group relative isolate inline-flex items-center",
        "rounded-full",
        "text-center font-sans text-[12px] md:text-[14px] leading-[18px] md:leading-[22px] font-bold tracking-[0.13px] md:tracking-[0.25px] capitalize",
        as === "button" && "cursor-pointer",
        "transition-all duration-200 hover:opacity-85 active:scale-[0.97]",
        variant === "filled" && !icon && "pr-8",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <Container
        variant="span"
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: "1px",
          background: `conic-gradient(from var(--border-angle), transparent 0%, transparent 75%, ${glow.soft} 90%, ${glow.strong} 92%, ${glow.soft} 94%, transparent 100%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "border-spin 3s linear infinite",
        }}
      />
      {variant === "filled" && (
        <Container
          variant="span"
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-25 mix-blend-overlay"
          style={{ backgroundImage: noiseTexture }}
        />
      )}
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


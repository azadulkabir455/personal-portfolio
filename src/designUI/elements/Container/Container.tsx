import type { ContainerProps } from "./types";

export default function Container({
  variant: Tag = "div",
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}

/* 
<Container variant="section" className="mx-auto max-w-[1240px] px-5">
  <p>Content ekhane thakbe</p>
</Container> 
*/
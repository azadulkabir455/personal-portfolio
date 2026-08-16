import type { TextProps } from "./types";

export default function Text({
  variant: Tag = "p",
  className = "",
  children,
  ...props
}: TextProps) {
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}

/*
<Text variant="h2" className="text-2xl font-bold">
  Heading here
</Text>
*/

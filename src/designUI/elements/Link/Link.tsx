import NextLink from "next/link";
import type { LinkProps } from "./types";

export default function Link({ className = "", children, ...props }: LinkProps) {
  return (
    <NextLink className={className} {...props}>
      {children}
    </NextLink>
  );
}

/*
<Link href="/dashboard" className="text-sm font-medium underline">
  Go to dashboard
</Link>
*/

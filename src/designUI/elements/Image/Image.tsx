import NextImage from "next/image";
import type { ImageProps } from "./types";

export default function Image({ className = "", ...props }: ImageProps) {
  return <NextImage className={className} {...props} />;
}

/*
<Image src="/images/hero/portfolioImage.png" alt="Fatema" fill className="object-contain" />
*/

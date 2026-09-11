import Link from "@/designUI/elements/Link/Link";
import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import type { RecentDesignSlideProps } from "../types";

export default function RecentDesignSlide({ images }: RecentDesignSlideProps) {
  return (
    <Container className="flex shrink-0 items-center gap-[3px] md:gap-[5.5px] lg:gap-[10px]">
      {images.map((image) => (
        <Link
          key={image.src}
          href={image.href}
          className="relative h-[120px] w-[160px] shrink-0 overflow-hidden rounded-[7px] md:h-[175px] md:w-[233.25px] md:rounded-[13px] lg:h-[256px] lg:w-[341px] lg:rounded-[12px]"
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </Link>
      ))}
    </Container>
  );
}

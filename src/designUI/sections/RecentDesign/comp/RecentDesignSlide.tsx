import Link from "@/designUI/elements/Link/Link";
import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import type { RecentDesignSlideProps } from "../types";

export default function RecentDesignSlide({ href, images }: RecentDesignSlideProps) {
  return (
    <Link href={href} className="flex shrink-0 items-center gap-[3px] md:gap-[5.5px] lg:gap-[10px]">
      {images.map((image) => (
        <Container
          key={image.src}
          className="relative h-[79.875px] w-[106.5px] shrink-0 overflow-hidden rounded-[4.57px] md:h-[139.78125px] md:w-[186.375px] md:rounded-[10.5px] lg:h-[256px] lg:w-[341px] lg:rounded-[12px]"
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </Container>
      ))}
    </Link>
  );
}

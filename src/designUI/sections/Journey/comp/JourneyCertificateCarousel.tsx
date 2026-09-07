import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import Link from "@/designUI/elements/Link/Link";
import type { JourneyCertificateCarouselProps } from "../types";

export default function JourneyCertificateCarousel({ certificates }: JourneyCertificateCarouselProps) {
  const track = [...certificates, ...certificates];

  return (
    <Container className="relative overflow-hidden">
      <Container className="flex w-max animate-[journey-marquee_25s_linear_infinite] gap-[4px] hover:[animation-play-state:paused] md:gap-[8px] lg:gap-[24px]">
        {track.map((certificate, index) => (
          <Link
            key={`${certificate.title}-${index}`}
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            title={certificate.title}
            className="relative block h-[100px] w-[136px] shrink-0 overflow-hidden rounded-[4px] bg-[#242423]/5 md:h-[125px] md:w-[170px] lg:h-[219px] lg:w-[283px]"
          >
            <Image src={certificate.image} alt={certificate.title} fill className="object-cover" />
          </Link>
        ))}
      </Container>
    </Container>
  );
}

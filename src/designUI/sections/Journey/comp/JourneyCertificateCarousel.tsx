"use client";

import { useState } from "react";
import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import type { JourneyCertificate } from "@/designUI/utilities/content/journey";
import type { JourneyCertificateCarouselProps } from "../types";
import JourneyCertificateModal from "./JourneyCertificateModal";

export default function JourneyCertificateCarousel({ certificates }: JourneyCertificateCarouselProps) {
  const [selected, setSelected] = useState<JourneyCertificate | null>(null);
  const track = [...certificates, ...certificates];

  return (
    <Container className="relative overflow-hidden">
      <Container className="flex w-max animate-[journey-marquee_25s_linear_infinite] gap-[4px] hover:[animation-play-state:paused] md:gap-[8px] lg:gap-[24px]">
        {track.map((certificate, index) => (
          <Container
            key={`${certificate.title}-${index}`}
            title={certificate.title}
            onClick={() => setSelected(certificate)}
            className="relative h-[100px] w-[136px] shrink-0 cursor-pointer overflow-hidden rounded-[4px] bg-[#242423]/5 md:h-[125px] md:w-[170px] lg:h-[219px] lg:w-[283px]"
          >
            <Image src={certificate.image} alt={certificate.title} fill className="object-cover" />
          </Container>
        ))}
      </Container>

      <JourneyCertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </Container>
  );
}

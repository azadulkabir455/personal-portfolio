"use client";

import { useState } from "react";
import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import Link from "@/designUI/elements/Link/Link";
import Icon from "@/designUI/elements/Icon/Icon";
import type { JourneyCertificateCarouselProps } from "../types";

const tileClassName =
  "relative block h-[100px] w-[136px] shrink-0 cursor-pointer overflow-hidden rounded-[4px] bg-[#242423]/5 md:h-[125px] md:w-[170px] lg:h-[219px] lg:w-[283px]";

export default function JourneyCertificateCarousel({ certificates }: JourneyCertificateCarouselProps) {
  const track = [...certificates, ...certificates];
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewCertificate = previewIndex !== null ? certificates[previewIndex] : null;

  return (
    <>
      <Container className="relative overflow-hidden">
        <Container className="flex w-max animate-[journey-marquee_25s_linear_infinite] gap-[4px] hover:[animation-play-state:paused] md:gap-[8px] lg:gap-[24px]">
          {track.map((certificate, index) =>
            certificate.isLinkable && certificate.link ? (
              <Link
                key={`${certificate.title}-${index}`}
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                title={certificate.title}
                className={tileClassName}
              >
                <Image src={certificate.image} alt={certificate.title} fill className="object-cover" />
              </Link>
            ) : (
              <button
                key={`${certificate.title}-${index}`}
                type="button"
                onClick={() => setPreviewIndex(index % certificates.length)}
                title={certificate.title}
                className={tileClassName}
              >
                <Image src={certificate.image} alt={certificate.title} fill className="object-cover" />
              </button>
            ),
          )}
        </Container>
      </Container>

      {previewCertificate && (
        <Container
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#171717]/70 p-4"
          onClick={() => setPreviewIndex(null)}
        >
          <Container
            className="relative flex max-h-[85vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[16px] bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#171717]/70 text-white transition-colors duration-200 hover:bg-[#171717]"
            >
              <Icon name="FaTimes" width={12} height={12} />
            </button>
            <Container className="relative aspect-[4/3] w-full bg-[#FAFAFA]">
              <Image
                src={previewCertificate.image}
                alt={previewCertificate.title}
                fill
                className="object-contain"
              />
            </Container>
          </Container>
        </Container>
      )}
    </>
  );
}

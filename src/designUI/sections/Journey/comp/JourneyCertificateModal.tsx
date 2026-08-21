"use client";

import { useEffect } from "react";
import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import type { JourneyCertificateModalProps } from "../types";

export default function JourneyCertificateModal({ certificate, onClose }: JourneyCertificateModalProps) {
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <Container
      className="journey-close-cursor fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
      onClick={onClose}
    >
      <Image
        src={certificate.image}
        alt={certificate.title}
        width={certificate.width}
        height={certificate.height}
        onClick={(event) => event.stopPropagation()}
        className="h-auto max-h-[90vh] w-auto max-w-[90vw] cursor-default object-contain"
      />
    </Container>
  );
}

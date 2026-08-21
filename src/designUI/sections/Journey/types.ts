import type { JourneyStep, JourneyTool, JourneyCertificate } from "@/designUI/utilities/content/journey";

export type JourneyStepItemProps = JourneyStep;
export type JourneyToolBadgeProps = JourneyTool;

export interface JourneyCertificateCarouselProps {
  certificates: JourneyCertificate[];
}

export interface JourneyCertificateModalProps {
  certificate: JourneyCertificate | null;
  onClose: () => void;
}

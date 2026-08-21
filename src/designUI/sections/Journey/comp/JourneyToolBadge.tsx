import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";
import type { JourneyToolBadgeProps } from "../types";

export default function JourneyToolBadge({ name, icon }: JourneyToolBadgeProps) {
  return (
    <Container
      title={name}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white md:h-10 md:w-10"
    >
      <Image src={icon} alt={name} width={24} height={24} className="h-auto w-[19px] md:w-6" />
    </Container>
  );
}

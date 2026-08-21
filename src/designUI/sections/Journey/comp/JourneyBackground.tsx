import Container from "@/designUI/elements/Container/Container";
import Image from "@/designUI/elements/Image/Image";

export default function JourneyBackground() {
  return (
    <Container className="pointer-events-none absolute inset-y-0 left-[10px] right-[10px] overflow-hidden rounded-[8px] md:rounded-[12px]">
      <Image
        src="/images/journey/BG/mobile.png"
        alt=""
        fill
        className="block object-cover md:hidden"
      />
      <Image
        src="/images/journey/BG/tab.png"
        alt=""
        fill
        className="hidden object-cover md:block lg:hidden"
      />
      <Image
        src="/images/journey/BG/desk.png"
        alt=""
        fill
        className="hidden object-cover lg:block"
      />
    </Container>
  );
}

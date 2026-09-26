import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import { VLine } from "@/designUI/components/GridLine/GridLine";

export default function ServicesGridLines() {
  return (
    <Container className="pointer-events-none absolute inset-0">
      <Container className="relative mx-auto h-full max-w-[1240px]">
        <VLine tone="dark" delay={0} className="inset-y-0 left-[16px] md:left-[40px] lg:left-[10px]" />
        <VLine
          tone="dark"
          delay={0.6}
          className={clsx(
            "inset-y-0",
            "left-[calc(16px_+_(100%_-_32px)_/_3)]",
            "md:left-[calc(40px_+_(100%_-_80px)_/_3)]",
            "lg:left-[calc(10px_+_(100%_-_20px)_/_3)]",
          )}
        />
        <VLine
          tone="dark"
          delay={1.2}
          className={clsx(
            "inset-y-0",
            "left-[calc(16px_+_(100%_-_32px)_*_2_/_3)]",
            "md:left-[calc(40px_+_(100%_-_80px)_*_2_/_3)]",
            "lg:left-[calc(10px_+_(100%_-_20px)_*_2_/_3)]",
          )}
        />
        <VLine tone="dark" delay={1.8} className="inset-y-0 right-[16px] md:right-[40px] lg:right-[10px]" />
      </Container>
    </Container>
  );
}

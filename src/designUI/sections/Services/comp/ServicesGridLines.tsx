import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";

const lineClassName = "absolute inset-y-0 w-px bg-[#242423]/12";

export default function ServicesGridLines() {
  return (
    <Container className="pointer-events-none absolute inset-0">
      <Container className="relative mx-auto h-full max-w-[1240px]">
        <Container className={clsx(lineClassName, "left-[16px] md:left-[40px] lg:left-[10px]")} />
        <Container
          className={clsx(
            lineClassName,
            "left-[calc(16px_+_(100%_-_32px)_/_3)]",
            "md:left-[calc(40px_+_(100%_-_80px)_/_3)]",
            "lg:left-[calc(10px_+_(100%_-_20px)_/_3)]",
          )}
        />
        <Container
          className={clsx(
            lineClassName,
            "left-[calc(16px_+_(100%_-_32px)_*_2_/_3)]",
            "md:left-[calc(40px_+_(100%_-_80px)_*_2_/_3)]",
            "lg:left-[calc(10px_+_(100%_-_20px)_*_2_/_3)]",
          )}
        />
        <Container className={clsx(lineClassName, "right-[16px] md:right-[40px] lg:right-[10px]")} />
      </Container>
    </Container>
  );
}

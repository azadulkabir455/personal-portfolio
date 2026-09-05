"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { useScrollSpy } from "./function";

export default function ScrollSpy() {
  const { sections, activeIndex, isOpen, toggleOpen, close, scrollToSection } = useScrollSpy();

  return (
    <>
      <Container className="fixed top-1/2 right-[50px] z-40 hidden -translate-y-1/2 flex-col items-center gap-[10px] lg:flex">
        <Container
          role="button"
          tabIndex={0}
          aria-label="Open section navigator"
          onClick={toggleOpen}
          className="flex cursor-pointer flex-col items-center gap-[6px]"
        >
          {sections.map((section, index) => (
            <Container key={section.id} className="flex h-[10px] w-[48px] items-center justify-center">
              <Container
                className={clsx(
                  "h-0 w-[24px] transition-[width,border-color] duration-300",
                  index === activeIndex
                    ? "w-[48px] border-t-2 border-[#005CD6]"
                    : "border-t border-[#8FBFFF]",
                )}
              />
            </Container>
          ))}
        </Container>
      </Container>

      {isOpen && (
        <>
          <Container className="fixed inset-0 z-40 hidden lg:block" onClick={close} />
          <Container
            className={clsx(
              sora.className,
              "fixed top-1/2 right-[50px] z-50 hidden h-[396px] w-[431px] -translate-y-1/2 flex-col gap-[15px] rounded-[12px] p-[40px] lg:flex",
            )}
            style={{ background: "linear-gradient(180deg, #64A6FF 18.22%, #00275C 100%)" }}
          >
            {sections.map((section, index) => (
              <Text
                key={section.id}
                role="button"
                tabIndex={0}
                onClick={() => scrollToSection(section.id)}
                className={clsx(
                  "cursor-pointer align-middle font-medium tracking-[0px] text-white transition-colors duration-200 hover:text-white/70",
                  "text-[18px] leading-[24px]",
                  index === activeIndex && "font-bold",
                )}
              >
                {index + 1}. {section.label}
              </Text>
            ))}
          </Container>
        </>
      )}
    </>
  );
}

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
      <Container className="fixed top-1/2 right-[50px] z-40 hidden -translate-y-1/2 flex-col items-center gap-[10px] xl:flex">
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
          <Container className="fixed inset-0 z-40 hidden xl:block" onClick={close} />
          <Container
            className={clsx(
              sora.className,
              "fixed top-1/2 right-[50px] z-50 hidden min-h-[396px] w-[431px] -translate-y-1/2 flex-col overflow-hidden rounded-[12px] p-[40px] xl:flex",
            )}
            style={{ background: "linear-gradient(180deg, #64A6FF 18.22%, #00275C 100%)" }}
          >
            {sections.map((section, index) => {
              const isActive = index === activeIndex;
              return (
                <Container
                  key={section.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => scrollToSection(section.id)}
                  className="group flex cursor-pointer items-center gap-[10px] py-[14px]"
                >
                  <Text
                    className={clsx(
                      "shrink-0 align-middle font-bold tracking-[0px] capitalize transition-all duration-200",
                      isActive
                        ? "text-[22px] leading-[28px] text-[#FFFF2E]"
                        : "text-[18px] leading-[24px] text-white group-hover:text-[22px] group-hover:leading-[28px] group-hover:text-[#FFFF2E]",
                    )}
                  >
                    {section.label}
                  </Text>
                  {isActive && <Container className="-mr-[40px] h-px flex-1 self-center bg-white/[0.24]" />}
                </Container>
              );
            })}
          </Container>
        </>
      )}
    </>
  );
}

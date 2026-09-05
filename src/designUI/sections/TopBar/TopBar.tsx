"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import SocialLinks from "@/designUI/components/SocialLinks/SocialLinks";
import { footerContent } from "@/designUI/utilities/content/footer";
import { useTopBar } from "./function";
import TopBarActionButtons from "./comp/TopBarActionButtons";
import TopBarMenuToggle from "./comp/TopBarMenuToggle";
import TopBarNav from "./comp/TopBarNav";
import TopBarSocialFooter from "./comp/TopBarSocialFooter";
import TopBarMobileActions from "./comp/TopBarMobileActions";
import type { TopBarMode } from "./types";

const experienceTextClassName = clsx(
  "font-sans font-semibold tracking-[0px] text-[#F7F7F7]",
  "text-[14px] leading-[20px]",
  "md:text-[20px] md:leading-[28px]",
);

const collapsedExperienceTextClassName = clsx(
  "font-sans font-semibold tracking-[0px] text-[#F7F7F7]",
  "text-[14px] leading-[21px]",
  "md:text-[20px] md:leading-[28px]",
);

const stickyGradientClassName =
  "bg-[linear-gradient(170.92deg,#005CD6_11.6%,#64A6FF_96.6%,#00D9FF_279.47%)]";

const barBackgroundByMode: Record<TopBarMode, string> = {
  transparent: "bg-transparent",
  sticky: clsx(stickyGradientClassName, "border border-white/24"),
  hidden: clsx(stickyGradientClassName, "border border-white/24"),
  menu: clsx(stickyGradientClassName, "border border-white/24"),
};

export default function TopBar() {
  const pathname = usePathname();
  const {
    data,
    isOpen,
    mode,
    menuHeight,
    mobileMenuHeight,
    toggleOpen,
    closeMenu,
    onMouseEnter,
    onMouseLeave,
  } = useTopBar();

  if (
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/forgot-password"
  )
    return null;

  const visibleNavLinks = data.navLinks.filter((link) => link.enabled);

  return (
    <>
      <Container
        variant="header"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 hidden transition-transform duration-300 ease-out lg:block",
          mode === "hidden" ? "-translate-y-[120%]" : "translate-y-0",
        )}
      >
        <Container className="p-[10px]">
          <Container
            className={clsx(
              "relative flex w-full flex-col overflow-hidden rounded-[12px] transition-colors duration-300",
              barBackgroundByMode[mode],
            )}
          >
            {mode !== "transparent" && (
              <Container className="pointer-events-none absolute inset-0 z-0 mx-auto w-full max-w-[1240px]">
                <Container className="absolute inset-y-0 left-[10px] w-px bg-white/[0.24]" />
                <Container className="absolute inset-y-0 right-[10px] w-px bg-white/[0.24]" />
              </Container>
            )}

            <Container className="relative z-10 mx-auto flex w-full max-w-[1240px] shrink-0 items-center justify-between px-[20px] py-[30px]">
              <Text className={experienceTextClassName}>{data.experienceLabel}</Text>

              <Container className="flex items-center gap-2 md:gap-3">
                <TopBarActionButtons
                  talkLabel={data.talkLabel}
                  talkHref={data.talkHref}
                  resumeLabel={data.resumeLabel}
                  resumeHref={data.resumeHref}
                />
                <TopBarMenuToggle isOpen={isOpen} onToggle={toggleOpen} />
              </Container>
            </Container>

            {isOpen && <Container className="relative z-10 h-px w-full shrink-0 bg-white/[0.24]" />}

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="topbar-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: menuHeight, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative z-10 flex w-full flex-col overflow-hidden"
                >
                  <Container className="no-scrollbar mx-auto flex w-full max-w-[1240px] flex-1 flex-col overflow-y-auto">
                    <TopBarNav navLinks={visibleNavLinks} onNavigate={closeMenu} />
                  </Container>

                  <TopBarSocialFooter />
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </Container>
      </Container>

      <Container
        variant="header"
        className={clsx("fixed inset-x-0 bottom-0 z-50", isOpen ? "hidden" : "lg:hidden")}
      >
        <Container className="p-[5px] md:p-[10px]">
          <Container
            className={clsx(
              stickyGradientClassName,
              "relative flex h-[50px] items-center overflow-hidden rounded-[8px] px-[16px] md:h-auto md:max-h-[72px] md:rounded-[12px] md:px-[40px] md:py-[22px]",
            )}
          >
            <Container className="pointer-events-none absolute inset-y-0 left-[16px] w-px bg-white/[0.24] md:left-[40px]" />
            <Container className="pointer-events-none absolute inset-y-0 right-[16px] w-px bg-white/[0.24] md:right-[40px]" />

            <Container className="relative flex w-full items-center justify-between gap-[11.25px] px-[15px] md:px-[30px]">
              <Text className={collapsedExperienceTextClassName}>{data.experienceLabel}</Text>
              <TopBarMenuToggle
                isOpen={isOpen}
                onToggle={toggleOpen}
                className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]"
              />
            </Container>
          </Container>
        </Container>
      </Container>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Container variant="header" className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
            <Container className="p-[5px] md:p-[10px]">
              <motion.div
                key="topbar-menu-mobile"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: mobileMenuHeight, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={clsx(
                  stickyGradientClassName,
                  "relative flex w-full flex-col overflow-hidden rounded-[8px] border border-white/24",
                )}
              >
                <Container className="pointer-events-none absolute inset-y-0 left-[15px] z-0 w-px bg-white/[0.24] md:left-[40px]" />
                <Container className="pointer-events-none absolute inset-y-0 right-[15px] z-0 w-px bg-white/[0.24] md:right-[40px]" />

                <Container className="no-scrollbar relative z-10 flex w-full flex-1 flex-col justify-between overflow-y-auto">
                  <TopBarNav navLinks={visibleNavLinks} onNavigate={closeMenu} />

                  <Container className="flex flex-col gap-[20px] px-[31px] pb-[24px] md:px-[70px]">
                    <SocialLinks label={footerContent.social.findMeLabel} links={footerContent.social.links} />
                    <TopBarMobileActions
                      talkLabel={data.talkLabel}
                      talkHref={data.talkHref}
                      resumeLabel={data.resumeLabel}
                      resumeHref={data.resumeHref}
                    />
                  </Container>
                </Container>

                <Container className="relative z-10 h-px w-full shrink-0 bg-white/[0.24]" />

                <Container className="relative z-10 flex shrink-0 items-center justify-between px-[31px] pt-[20px] pb-[16px] md:px-[70px]">
                  <Text
                    className={clsx(
                      "font-sans font-semibold tracking-[0px] text-[#F7F7F7]",
                      "text-[12px] leading-[18px]",
                      "md:text-[20px] md:leading-[28px]",
                    )}
                  >
                    {data.experienceLabel}
                  </Text>
                  <TopBarMenuToggle
                    isOpen={isOpen}
                    onToggle={toggleOpen}
                    className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]"
                  />
                </Container>
              </motion.div>
            </Container>
          </Container>
        )}
      </AnimatePresence>
    </>
  );
}

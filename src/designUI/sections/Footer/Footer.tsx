"use client";

import clsx from "clsx";
import { DownloadIcon, MailIcon } from "@/designUI/utilities/icons";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Link from "@/designUI/elements/Link/Link";
import Image from "@/designUI/elements/Image/Image";
import Button from "@/designUI/elements/Button/Button";
import { sora } from "@/designUI/utilities/fonts/fonts";
import SocialLinks from "@/designUI/components/SocialLinks/SocialLinks";
import { useFooter } from "./function";
import FooterCTAButton from "./comp/FooterCTAButton";

export default function Footer() {
  const { data } = useFooter();

  return (
    <Container variant="section" id="footer" className="w-full pb-[5px] md:pb-[10px] lg:pb-0">
      <Container className="relative mx-[5px] bg-[#0B0B0A] pt-[30px] md:mx-[10px] lg:mx-[10px]">
        <Container className="container relative flex flex-col gap-[10px] px-[16px] md:flex-row md:px-[30px] lg:gap-[30px] lg:px-0">
          <Container className="relative z-0 flex flex-1 flex-col overflow-hidden rounded-[8px] bg-[#FFFFFF0A] px-[16px] py-[20px] md:min-h-[460px] md:px-[30px] md:py-[40px] lg:min-h-[520px] lg:rounded-[12px] lg:px-[40px] lg:pt-[60px] lg:pb-[70px]">
            <Container className="absolute top-0 right-0 bottom-0 z-0 w-3/4 md:right-[-75px] md:w-full">
              <Image
                src={data.profile.image}
                alt={data.profile.name}
                fill
                className="object-contain object-right-bottom"
              />
            </Container>

            <Container className="relative flex flex-1 flex-col">
              <Container className="relative z-10 flex max-w-[400px] flex-col">
                <Container className="flex flex-col gap-[4px] md:max-w-[285px]">
                  <Text variant="h3">
                    <Link
                      href="/"
                      className={clsx(
                        sora.className,
                        "inline-block font-bold tracking-[0px] text-[#F7F7F7] capitalize transition-colors duration-200 hover:text-[#388EFF]",
                        "text-[12px] leading-[18px]",
                        "md:text-[16px] md:leading-[28px]",
                        "lg:text-[18px] lg:leading-[28px]",
                      )}
                    >
                      {data.profile.name}
                    </Link>
                  </Text>
                  <Text
                    className={clsx(
                      "font-sans font-light tracking-[0px] text-[#F7F7F7]",
                      "text-[14px] leading-[24px]",
                      "lg:text-[16px] lg:leading-[26px]",
                    )}
                  >
                    {data.profile.tagline}
                  </Text>
                </Container>

                <Container className="mt-[30px] flex flex-col gap-[4px] lg:mt-[60px]">
                  <Text
                    className={clsx(
                      sora.className,
                      "font-bold tracking-[0px] text-[#F7F7F7]",
                      "text-[12px] leading-[18px]",
                      "md:text-[14px]",
                    )}
                  >
                    {data.profile.availabilityLabel}
                  </Text>
                  <Container className="flex flex-col items-start gap-[16px] lg:flex-row lg:flex-nowrap lg:items-center lg:gap-[24px]">
                    <Text
                      className={clsx(
                        "font-sans font-light tracking-[0px] whitespace-nowrap text-white/70",
                        "text-[12px] leading-[20px]",
                        "md:text-[14px] md:leading-[26px]",
                      )}
                    >
                      {data.profile.availability.map((item, index) => (
                        <span key={item}>
                          {index > 0 && (
                            <span className="inline-block px-[6px]">•</span>
                          )}
                          {item}
                        </span>
                      ))}
                    </Text>
                    <Button
                      variant="filled"
                      iconMotion="vertical"
                      className="!h-[40px] !gap-[18px] !bg-none !bg-[#FFFFFF0A] !py-[9px] !pl-[24px]"
                      iconClassName="my-1 mr-[5px] !h-[32px] !w-[32px] !bg-[#F7F7F7]"
                      icon={<DownloadIcon width={16} height={16} />}
                    >
                      {data.profile.resumeLabel}
                    </Button>
                  </Container>
                </Container>
              </Container>

              <Container className="relative -z-10 -mx-[16px] mt-[20px] border-t border-white/12 md:-mx-[30px] md:mt-[30px] lg:-mx-[40px] lg:mt-[50px]" />

              <Container className="relative z-10 flex max-w-[335px] flex-col gap-[8px] pt-[20px] md:mt-0 md:max-w-[260px] md:pt-[25px] lg:mt-auto lg:max-w-[335px] lg:pt-[50px]">
                <Text
                  className={clsx(
                    "font-sans font-light tracking-[0px] text-[#9E9E9E]",
                    "text-[12px] leading-[20px]",
                    "md:max-w-[260px] md:text-[14px] md:leading-[24px]",
                    "lg:max-w-[335px] lg:text-[16px] lg:leading-[26px]",
                  )}
                >
                  {data.profile.contactPrompt}
                </Text>
                <Link
                  href={`mailto:${data.profile.email}`}
                  className={clsx(
                    sora.className,
                    "flex items-center gap-[12px] font-semibold tracking-[0px] text-[#F7F7F7]",
                    "text-[12px] leading-[20px]",
                    "md:text-[14px] md:leading-[24px]",
                    "lg:text-[16px] lg:leading-[26px]",
                  )}
                >
                  <MailIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                  {data.profile.email}
                </Link>
              </Container>
            </Container>

            <Container className="absolute right-[56px] bottom-[60px] z-10">
              <FooterCTAButton
                label={data.profile.ctaLabel}
                href={data.profile.ctaHref}
              />
            </Container>
          </Container>

          <Container className="relative z-0 flex flex-col rounded-[8px] bg-[#FFFFFF0A] px-[16px] py-[20px] md:w-1/3 md:min-w-[280px] md:px-[30px] md:py-[40px] lg:rounded-[12px] lg:px-[40px] lg:pt-[60px] lg:pb-[70px]">
            <Container className="mb-[90px] flex flex-col gap-[8px]">
              <Text
                variant="h3"
                className={clsx(
                  sora.className,
                  "font-bold tracking-[0px] text-[#F7F7F7] capitalize",
                  "text-[12px] leading-[18px]",
                  "md:text-[16px] md:leading-[28px]",
                  "lg:text-[18px] lg:leading-[28px]",
                )}
              >
                {data.social.heading}
              </Text>
              <Text
                className={clsx(
                  "font-sans font-light tracking-[0px] text-[#9E9E9E]",
                  "text-[14px] leading-[24px]",
                  "lg:text-[16px] lg:leading-[26px]",
                )}
              >
                {data.social.description}
              </Text>
            </Container>

            <Container className="relative -z-10 -mx-[15px] mt-[20px] border-t border-white/12 md:-mx-[29px] min-[768px]:max-[970px]:mt-[24px] min-[971px]:max-[1024px]:mt-[45px] min-[1025px]:max-[1072px]:mt-[52px] min-[1073px]:mt-[78px] lg:-mx-[39px]" />

            <Container className="pt-[30px] md:pt-[40px] lg:pt-[60px]">
              <SocialLinks label={data.social.findMeLabel} links={data.social.links} />
            </Container>
          </Container>
        </Container>

        <Container className="container relative flex flex-col items-center justify-between gap-[8px] px-[10px] py-[20px] md:flex-row md:px-[30px] md:py-[30px] lg:px-[10px] lg:py-[40px]">
          <Text
            className={clsx(
              "font-sans font-light tracking-[-0.5px] text-[#616161]",
              "text-[10px] leading-[15px]",
              "md:text-[12px] md:leading-[18px]",
              "lg:text-[14px] lg:leading-[18px] lg:tracking-[0px]",
            )}
          >
            {data.legal.copyright}
          </Text>

          <Container className="flex items-center gap-[16px] lg:gap-[24px]">
            <Container className="flex items-center gap-[16px]">
              {data.legal.links.map((link, index) => (
                <Container key={link.label} className="flex items-center gap-[16px]">
                  {index > 0 && (
                    <Container className="h-[16px] w-px bg-white/20" />
                  )}
                  <Link
                    href={link.href}
                    className={clsx(
                      "font-sans font-light tracking-[-0.5px] text-[#616161] transition-colors duration-200 hover:text-white/70",
                      "text-[10px] leading-[15px]",
                      "md:text-[12px] md:leading-[18px]",
                      "lg:text-[14px] lg:leading-[18px] lg:tracking-[0px]",
                    )}
                  >
                    {link.label}
                  </Link>
                </Container>
              ))}
            </Container>

            <Container className="h-[16px] w-px bg-white/20" />

            <Text
              className={clsx(
                "font-sans font-light tracking-[-0.5px] text-[#616161]",
                "text-[10px] leading-[15px]",
                "md:text-[12px] md:leading-[18px]",
                "lg:text-[14px] lg:leading-[18px] lg:tracking-[0px]",
              )}
            >
              {data.legal.developedByLabel}{" "}
              <Link
                href={data.legal.developedByHref ?? "#"}
                className="transition-colors duration-200 hover:text-[#388EFF]"
              >
                {data.legal.developedByName}
              </Link>
            </Text>
          </Container>
        </Container>
      </Container>

      <Container className="relative mx-[5px] flex items-center justify-center rounded-b-[8px] bg-[#0B0B0A] md:mx-[10px] lg:mx-[10px] lg:rounded-b-[12px]">
        <Text
          variant="h2"
          className={clsx(
            sora.className,
            "px-[10px] text-center font-bold tracking-[0px] text-[#F7F7F7] capitalize",
            "text-[34px] leading-[40px]",
            "md:text-[70px] md:leading-[90px]",
            "lg:text-[142px] lg:leading-[160px]",
          )}
        >
          {data.profile.name}
        </Text>
      </Container>
    </Container>
  );
}

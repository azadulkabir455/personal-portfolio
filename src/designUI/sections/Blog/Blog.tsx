"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import { sora } from "@/designUI/utilities/fonts/fonts";
import BlogCard from "@/designUI/components/BlogCard/BlogCard";
import { useBlog } from "./function";
import type { BlogProps } from "./types";

function BlogNumber({ index }: { index: number }) {
  return (
    <Text
      aria-hidden="true"
      className={clsx(
        sora.className,
        "pointer-events-none -mt-[15px] block text-center font-bold text-transparent capitalize",
        "md:-mt-[20px] lg:-mt-[30px]",
        "text-[84px] leading-[92px]",
        "lg:text-[94px] lg:leading-[108px]",
      )}
      style={{ WebkitTextStroke: "4px #242423" }}
    >
      {String(index + 1).padStart(2, "0")}
    </Text>
  );
}

export default function Blog({ intro, posts }: BlogProps) {
  const { data } = useBlog();
  const resolvedIntro = intro ?? data.intro;
  const resolvedPosts = posts ?? data.posts;

  return (
    <Container variant="section" id="blog" className="w-full">
      <Container className="relative mx-[5px] bg-[#0B0B0A] md:mx-[10px]">
        <Image
          src="/images/blog/globe.png"
          alt=""
          width={320}
          height={320}
          className="pointer-events-none absolute top-[35px] left-[36px] z-0 block w-[200px] max-w-none max-h-[257px] object-contain opacity-60 md:top-[78px] md:left-[120px] md:w-[300px] lg:top-[98px] lg:left-[90px] lg:w-[350px]"
        />

        <Container
          className={clsx(
            "container relative",
            "px-[16px] pt-[20px]",
            "md:px-[40px] md:pt-[60px]",
            "lg:px-[10px] lg:pt-[80px]",
          )}
        >
          <Container className="relative flex flex-col gap-[12px] md:gap-[24px] lg:flex-row lg:items-start lg:justify-between lg:gap-[30px]">
            <Container className="relative lg:shrink-0">
              <Text
                className={clsx(
                  sora.className,
                  "inline-block text-left align-middle font-semibold tracking-[1.25px] text-[#F7F7F7]",
                  "rounded-[100px] bg-[#242423] px-[12px] py-[5px]",
                  "text-[10px] leading-[15px]",
                  "md:px-[16px] md:text-[12px] md:leading-[18px]",
                )}
              >
                {resolvedIntro.badge}
              </Text>
            </Container>

            {resolvedIntro.description && (
              <Text
                className={clsx(
                  sora.className,
                  "block flex-1 align-middle font-medium tracking-[0px] text-[#F7F7F7]/70 lg:max-w-[740px]",
                  "text-[12px] leading-[20px] indent-[55px]",
                  "md:text-[16px] md:leading-[26px]",
                )}
              >
                {resolvedIntro.description}
              </Text>
            )}
          </Container>
        </Container>

        <Container className="relative mt-[20px] h-0 w-full border-t border-white/12 md:mt-[30px] lg:mt-[40px]" />

        <Container
          className={clsx(
            "container relative",
            "px-[16px] pt-[20px] pb-[16px]",
            "md:px-[40px] md:pt-[30px] md:pb-[20px]",
            "lg:px-[10px] lg:pt-[60px] lg:pb-[50px]",
          )}
        >
          <Container className="grid grid-cols-1 gap-[8px] md:grid-cols-3 md:gap-[16px] lg:gap-[30px]">
            {resolvedPosts.map((post, index) => (
              <Container key={post.title} className="relative md:flex md:h-full md:flex-col">
                <Container className="relative z-10 md:flex-1">
                  <BlogCard {...post} />
                </Container>
                <BlogNumber index={index} />
              </Container>
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

"use client";

import clsx from "clsx";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Image from "@/designUI/elements/Image/Image";
import Link from "@/designUI/elements/Link/Link";
import { sora } from "@/designUI/utilities/fonts/fonts";
import { ArrowLeftIcon, ArrowRightIcon } from "@/designUI/utilities/icons";
import Blog from "@/designUI/sections/Blog/Blog";
import { useBlogDetails } from "./function";

const backLinkClassName =
  "flex items-center gap-[10px] text-center align-middle font-sans text-[14px] leading-[22px] font-bold tracking-[0.25px] text-[#242423] capitalize";

export default function BlogDetails() {
  const { data, relatedPosts } = useBlogDetails();

  return (
    <>
      <Container variant="section" className="w-full bg-white">
        <Container className="container mx-auto px-[20px] pt-[24px] md:px-[50px] md:pt-[40px] lg:px-[20px] lg:pt-[200px]">
          <Link href={data.backHref} className={clsx(backLinkClassName, "mb-[12px] md:mb-[16px] lg:mb-[24px]")}>
            <ArrowLeftIcon width={14} height={14} color="#388EFF" />
            {data.backLabel}
          </Link>

          <Text
            variant="h1"
            className={clsx(
              sora.className,
              "mb-[6px] font-bold tracking-[0px] text-[#242423] capitalize",
              "text-[28px] leading-[36px]",
              "md:text-[36px] md:leading-[46px]",
              "lg:text-[46px] lg:leading-[56px]",
            )}
          >
            {data.title}
          </Text>

          <Text
            className={clsx(
              sora.className,
              "font-medium tracking-[0px] text-[#616161]",
              "mb-[20px] text-[14px] leading-[22px]",
              "md:mb-[28px] md:text-[16px] md:leading-[24px]",
              "lg:mb-[40px] lg:text-[18px] lg:leading-[24px]",
            )}
          >
            {data.subtitle}
          </Text>

          <Container className="relative h-[220px] w-full overflow-hidden md:h-[340px] lg:h-[500px]">
            <Image src={data.image} alt={data.title} fill className="object-cover object-top" />
          </Container>

          <Container className="mt-[16px] flex flex-wrap gap-[8px] md:mt-[20px]">
            {data.tags.map((tag) => (
              <Text
                key={tag}
                className="rounded-full bg-[linear-gradient(170.92deg,#005CD666_11.6%,#64A6FF66_96.6%,#00D9FF66_279.47%)] px-[10px] py-[3px] font-sans text-[12px] font-light text-[#242423] md:px-[12px] md:py-[4px]"
              >
                {tag}
              </Text>
            ))}
          </Container>

          <Container
            className={clsx(
              sora.className,
              "prose prose-neutral mt-[40px] mb-[40px] max-w-none md:mt-[50px] md:mb-[50px] lg:mt-[60px] lg:mb-[60px]",
              "prose-headings:font-bold prose-headings:tracking-[0px] prose-headings:text-[#242423]",
              "prose-h1:text-[24px] prose-h1:leading-[32px] md:prose-h1:text-[28px] md:prose-h1:leading-[36px]",
              "prose-h2:text-[20px] prose-h2:leading-[28px] md:prose-h2:text-[24px] md:prose-h2:leading-[32px]",
              "prose-h3:text-[18px] prose-h3:leading-[26px] md:prose-h3:text-[22px] md:prose-h3:leading-[30px]",
              "prose-h4:text-[16px] prose-h4:leading-[24px] md:prose-h4:text-[18px] md:prose-h4:leading-[26px]",
              "prose-h5:text-[15px] prose-h5:leading-[22px] md:prose-h5:text-[16px] md:prose-h5:leading-[24px]",
              "prose-h6:text-[14px] prose-h6:leading-[20px] md:prose-h6:text-[15px] md:prose-h6:leading-[22px]",
              "prose-p:font-sans prose-p:font-light prose-p:text-[#616161]",
              "prose-p:text-[14px] prose-p:leading-[24px] md:prose-p:text-[16px] md:prose-p:leading-[28px]",
              "prose-img:w-full prose-img:h-auto prose-img:rounded-[4px]",
            )}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Container>

        <Container className="w-full border-t border-[#2424231F]">
          <Container className="container mx-auto flex justify-end px-[20px] pt-[24px] pb-[80px] md:px-[50px] lg:px-[20px]">
            <Link href="/" className={backLinkClassName}>
              Back To Home Page
              <ArrowRightIcon width={14} height={14} color="#388EFF" />
            </Link>
          </Container>
        </Container>
      </Container>

      <Blog intro={{ badge: "Others Post", description: "" }} posts={relatedPosts} />
    </>
  );
}

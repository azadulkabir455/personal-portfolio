import type { SocialIconConfig } from "@/designUI/components/SocialIcon/types";

export interface SocialLink {
  icon: SocialIconConfig;
  url: string;
}

export interface HeroContent {
  title: string;
  titleExtend?: string;
  greeting: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  photoUrl: string;
  backgroundUrl: string;
  backgroundUrlTablet: string;
  backgroundUrlMobile: string;
  socialLinks: SocialLink[];
}

export const heroContent: HeroContent = {
  title: "Designing",
  titleExtend: "Digital Products",
  greeting:
    "Hey, I am Fatema, I help business to turn complex ideas into simple, intuitive digital experiences.",
  description:
    "This portfolio showcases my journey as a UX/UI designer that reflects my passion for design.",
  ctaLabel: "Book A Call",
  ctaLink: "#",
  photoUrl: "/images/hero/portfolioImage.png",
  backgroundUrl: "/images/hero/bannerBG.png",
  backgroundUrlTablet: "/images/hero/bannerBGTab.png",
  backgroundUrlMobile: "/images/hero/bannerBGMobile.png",
  socialLinks: [
    { icon: { name: "FaLinkedinIn" }, url: "#" },
    { icon: { name: "FaBehance" }, url: "#" },
    { icon: { name: "FaDribbble" }, url: "#" },
  ],
};

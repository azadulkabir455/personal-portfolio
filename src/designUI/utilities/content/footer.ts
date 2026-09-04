import type { SocialIconConfig } from "@/designUI/components/SocialIcon/types";

export interface FooterSocialLink {
  icon: SocialIconConfig;
  href: string;
}

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterProfile {
  name: string;
  tagline: string;
  image: string;
  availabilityLabel: string;
  availability: string[];
  resumeLabel: string;
  resumeHref: string;
  ctaLabel: string;
  ctaHref: string;
  contactPrompt: string;
  email: string;
}

export interface FooterSocial {
  heading: string;
  description: string;
  findMeLabel: string;
  links: FooterSocialLink[];
}

export interface FooterLegal {
  copyrightName: string;
  copyrightNameHref: string;
  links: FooterLegalLink[];
  developedByLabel: string;
  developedByName: string;
  developedByHref?: string;
}

export interface FooterContent {
  profile: FooterProfile;
  social: FooterSocial;
  legal: FooterLegal;
}

export const footerContent: FooterContent = {
  profile: {
    name: "Fatema Tuz Sultana",
    tagline: "Creating thoughtful digital experiences that put people first and help businesses grow.",
    image: "/images/hero/portfolioImage.png",
    availabilityLabel: "Available For",
    availability: ["Freelance", "Remote", "Full-time"],
    resumeLabel: "My Resume",
    resumeHref: "/resume.pdf",
    ctaLabel: "Let's talk now",
    ctaHref: "/#contact",
    contactPrompt: "Have any project or job opportunity? Let's start your Project",
    email: "fatema.tuz.sultana@gmail.com",
  },
  social: {
    heading: "Explore My Social Media",
    description:
      "Whether you're looking for a UI/UX designer, feel free to connect with me through any of the platforms below.",
    findMeLabel: "Find Me Online",
    links: [
      { icon: { name: "FaLinkedinIn" }, href: "https://linkedin.com" },
      { icon: { name: "FaBehance" }, href: "https://behance.net" },
      { icon: { name: "FaDribbble" }, href: "https://dribbble.com" },
      { icon: { name: "FaInstagram" }, href: "https://instagram.com" },
      { icon: { name: "FaTwitter" }, href: "https://x.com" },
      { icon: { name: "FaWhatsapp" }, href: "https://wa.me" },
      { icon: { name: "FaFacebookF" }, href: "https://facebook.com" },
    ],
  },
  legal: {
    copyrightName: "Fatema Tuz Sultana",
    copyrightNameHref: "/",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
    developedByLabel: "Developed by",
    developedByName: "Azad Ul Kabir",
    developedByHref: "#",
  },
};

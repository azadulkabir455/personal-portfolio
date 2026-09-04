export interface CaseStudyImages {
  mobile: string;
  tab: string;
  desktop: string;
}

export interface CaseStudySlide {
  publishedLabel: string;
  publishedDate: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  images: CaseStudyImages;
  studyImage: string;
}

export interface CaseStudyContent {
  slides: CaseStudySlide[];
}

const bgImages: CaseStudyImages = {
  mobile: "/images/casestudy/bgmobile.png",
  tab: "/images/casestudy/bgtab.png",
  desktop: "/images/casestudy/bgdesk.png",
};

export const caseStudyContent: CaseStudyContent = {
  slides: [
    {
      publishedLabel: "Published Date:",
      publishedDate: "May 22nd, 2026",
      title: "ShareTrip : Flight Booking Experience | UX Audit",
      description:
        "A UX redesign of ShareTrip's flight booking experience focused on simplifying the user journey, improving navigation, and creating a clean, intuitive interface that makes booking flights faster and more effortless.",
      ctaLabel: "View Case Study",
      ctaLink: "#",
      images: bgImages,
      studyImage: "/images/featureprojects/p3.png",
    },
    {
      publishedLabel: "Published Date:",
      publishedDate: "March 10th, 2026",
      title: "Software Agency Website | Business Website",
      description:
        "Mobile-first landing page redesign focused on improving user experience, clarity of messaging, and conversion across every device.",
      ctaLabel: "View Case Study",
      ctaLink: "#",
      images: bgImages,
      studyImage: "/images/featureprojects/p1.png",
    },
    {
      publishedLabel: "Published Date:",
      publishedDate: "January 18th, 2026",
      title: "Real Estate Landing Page | SaaS Platform",
      description:
        "A clean, intuitive interface redesign for a real estate SaaS platform, streamlining property discovery and boosting user engagement.",
      ctaLabel: "View Case Study",
      ctaLink: "#",
      images: bgImages,
      studyImage: "/images/featureprojects/p2.png",
    },
  ],
};

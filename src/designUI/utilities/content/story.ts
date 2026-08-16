export interface StoryClientLogo {
  src: string;
  alt: string;
  height: number;
}

export interface StoryProcessStep {
  label: string;
  className: string;
  image?: string;
  icon?: boolean;
}

export interface StoryStat {
  value: string;
  label: string;
  description: string;
}

export interface StoryContent {
  title: string;
  paragraph: string;
  impactHeading: string;
  clientLogos: StoryClientLogo[];
  processSteps: StoryProcessStep[];
  statsImageUrl: string;
  stats: StoryStat[];
}

export const storyContent: StoryContent = {
  title: "My Story",
  paragraph:
    "Over the years, I've worked with startups, agencies, and product teams to improve usability, increase engagement, and simplify digital experiences across web and mobile platforms. My expertise lies primarily in product design and UI/UX, including mobile application design for iOS and Android.",
  impactHeading: "Designing Products That Create Measurable Impact",
  clientLogos: [
    { src: "/images/story/officeLogo/gp.png", alt: "GP", height: 31 },
    { src: "/images/story/officeLogo/robi.png", alt: "Robi", height: 31 },
    { src: "/images/story/officeLogo/orangetollz.png", alt: "Orange Tollz", height: 30 },
    { src: "/images/story/officeLogo/sheba.png", alt: "Sheba", height: 34 },
    { src: "/images/story/officeLogo/beatnik.png", alt: "Beatnik", height: 23 },
    { src: "/images/story/officeLogo/iovision.png", alt: "iovision", height: 34 },
    { src: "/images/story/officeLogo/american.png", alt: "American", height: 28 },
  ],
  processSteps: [
    {
      label: "I Transform",
      className: "bg-[linear-gradient(180deg,_#64A6FF_18.22%,_#00275C_100%)] text-[#FFFF2E]",
    },
    {
      label: "Ideas Into Human-Centered",
      className: "text-[#F7F7F7]",
      image: "/images/story/buttonbg.jpg",
      icon: true,
    },
    {
      label: "Digital Experiences",
      className: "bg-[linear-gradient(172.76deg,_#181818_9.51%,_#388EFF_116.93%)] text-[#FFFF2E]",
    },
  ],
  statsImageUrl: "/images/story/left.png",
  stats: [
    {
      value: "150+",
      label: "Projects Completed",
      description: "I have successfully completed a variety of projects across web and mobile.",
    },
    {
      value: "100%",
      label: "Happy Clients",
      description: "I have worked with clients from different industries delivering designs.",
    },
  ],
};

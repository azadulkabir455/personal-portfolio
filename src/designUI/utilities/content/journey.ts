export interface JourneyIntro {
  preHeader: string;
  paragraphPrimary: string;
  paragraphSecondary: string;
  ctaLabel: string;
  subHeading: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface JourneyTool {
  name: string;
  icon: string;
}

export interface JourneyCertificate {
  title: string;
  image: string;
  width: number;
  height: number;
}

export interface JourneyToolkit {
  toolsTitle: string;
  tools: JourneyTool[];
  certificationsTitle: string;
  certificates: JourneyCertificate[];
}

export interface JourneyContent {
  intro: JourneyIntro;
  steps: JourneyStep[];
  toolkit: JourneyToolkit;
}

export const journeyContent: JourneyContent = {
  intro: {
    preHeader: "My Path to Mastery in UI/UX Design",
    paragraphPrimary: "I believe great design goes beyond aesthetics - it solves real problems and creates meaningful user experiences. My approach combines user research, strategic thinking, and modern UI principles to design products that are both intuitive and accessible.",
    paragraphSecondary: "From wireframes to high-fidelity prototypes, every design decision is guided by usability, business goals, and industry best practices, including WCAG accessibility standards.",
    ctaLabel: "Let's Talk Now",
    subHeading: "Depends on the scope of work I extend my design process",
  },
  steps: [
    {
      step: "Step 1",
      title: "Understanding the project requirements",
      description:
        "Every project starts with a discovery session where I learn about your business, target audience, project goals, and challenges. This helps me define the right problem before moving into the design phase.",
    },
    {
      step: "Step 2",
      title: "Competitor & User Research",
      description:
        "Once I understand your goals, I analyze competitors, industry trends, and user behavior to identify opportunities. These insights help me make informed design decisions instead of relying on assumptions.",
    },
    {
      step: "Step 3",
      title: "Information Architecture & Wireframing",
      description:
        "After completing the research, I organize the content, create user flows, and develop low-fidelity wireframes. This allows us to validate the structure and user journey before focusing on visuals.",
    },
  ],
  toolkit: {
    toolsTitle: "Tools & Technologies I Use:",
    tools: [
      { name: "Photoshop", icon: "/images/journey/logo/ps.png" },
      { name: "Illustrator", icon: "/images/journey/logo/ai.png" },
      { name: "Figma", icon: "/images/journey/logo/fig.png" },
      { name: "Creative Cloud", icon: "/images/journey/logo/cd.png" },
      { name: "Lightroom", icon: "/images/journey/logo/l.png" },
      { name: "ChatGPT", icon: "/images/journey/logo/gpt.png" },
    ],
    certificationsTitle: "Trainings & Certifications:",
    certificates: [
      {
        title: "Mobile User Experience (UX) Design",
        image: "/images/journey/certificate/cer1.jpg",
        width: 500,
        height: 366,
      },
      {
        title: "Visual Design: The Ultimate Guide",
        image: "/images/journey/certificate/cer2.jpg",
        width: 500,
        height: 366,
      },
      {
        title: "Foundations of User Experience (UX) Design",
        image: "/images/journey/certificate/cer3.jpg",
        width: 670,
        height: 520,
      },
      {
        title: "Claude 101",
        image: "/images/journey/certificate/cer4.png",
        width: 3300,
        height: 2550,
      },
    ],
  },
};

export interface ScrollSpySection {
  id: string;
  label: string;
  visibilityKey?: string;
}

export interface ScrollSpyContent {
  sections: ScrollSpySection[];
}

export const scrollSpyContent: ScrollSpyContent = {
  sections: [
    { id: "hero", label: "Sliders", visibilityKey: "hero" },
    { id: "story", label: "My Story", visibilityKey: "story" },
    { id: "journey", label: "My Path to Mastery", visibilityKey: "journey" },
    { id: "featured-projects", label: "Featured Projects", visibilityKey: "featuredProjects" },
    { id: "recent-design", label: "My Recent Design", visibilityKey: "recentDesign" },
    { id: "services", label: "What I can do for you", visibilityKey: "services" },
    { id: "case-study", label: "My Case Study", visibilityKey: "caseStudy" },
    { id: "blog", label: "My article on UI and UX", visibilityKey: "blog" },
    { id: "footer", label: "Footer" },
  ],
};

export interface ScrollSpySection {
  id: string;
  label: string;
}

export interface ScrollSpyContent {
  sections: ScrollSpySection[];
}

export const scrollSpyContent: ScrollSpyContent = {
  sections: [
    { id: "hero", label: "Sliders" },
    { id: "story", label: "My Story" },
    { id: "journey", label: "My Path to Mastery" },
    { id: "featured-projects", label: "Featured Projects" },
    { id: "services", label: "What I can do for you" },
    { id: "blog", label: "My article on UI and UX" },
    { id: "footer", label: "Footer" },
  ],
};

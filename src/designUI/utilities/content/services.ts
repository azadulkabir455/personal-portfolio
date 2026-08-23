export interface ServiceItem {
  number: string;
  title: string;
}

export interface ServicesIntro {
  badge: string;
}

export interface ServicesContent {
  intro: ServicesIntro;
  items: ServiceItem[];
}

export const servicesContent: ServicesContent = {
  intro: {
    badge: "What I can do for you",
  },
  items: [
    { number: "1", title: "Mobile App Design" },
    { number: "2", title: "Website Design" },
    { number: "3", title: "Pitch Deck" },
    { number: "4", title: "Web Application" },
  ],
};

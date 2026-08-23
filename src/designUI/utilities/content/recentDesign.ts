export interface RecentDesignImage {
  src: string;
  alt: string;
}

export interface RecentDesignGroup {
  href: string;
  images: RecentDesignImage[];
}

export interface RecentDesignIntro {
  text: string;
}

export interface RecentDesignContent {
  intro: RecentDesignIntro;
  groups: RecentDesignGroup[];
}

export const recentDesignContent: RecentDesignContent = {
  intro: {
    text: "Some of my Recent Design",
  },
  groups: [
    {
      href: "#featured-projects",
      images: [
        { src: "/images/featureprojects/othersProject/op1.png", alt: "Recent design preview 1" },
        { src: "/images/featureprojects/othersProject/op2.png", alt: "Recent design preview 2" },
      ],
    },
    {
      href: "#featured-projects",
      images: [
        { src: "/images/featureprojects/othersProject/op3.png", alt: "Recent design preview 3" },
        { src: "/images/featureprojects/othersProject/op4.png", alt: "Recent design preview 4" },
      ],
    },
  ],
};

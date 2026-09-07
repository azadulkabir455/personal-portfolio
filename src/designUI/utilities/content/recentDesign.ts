export interface RecentDesignImage {
  src: string;
  alt: string;
  href: string;
}

export interface RecentDesignGroup {
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
      images: [
        {
          src: "/images/featureprojects/othersProject/op1.png",
          alt: "Recent design preview 1",
          href: "#featured-projects",
        },
        {
          src: "/images/featureprojects/othersProject/op2.png",
          alt: "Recent design preview 2",
          href: "#featured-projects",
        },
      ],
    },
    {
      images: [
        {
          src: "/images/featureprojects/othersProject/op3.png",
          alt: "Recent design preview 3",
          href: "#featured-projects",
        },
        {
          src: "/images/featureprojects/othersProject/op4.png",
          alt: "Recent design preview 4",
          href: "#featured-projects",
        },
      ],
    },
    {
      images: [
        {
          src: "/images/featureprojects/othersProject/op5.png",
          alt: "Recent design preview 5",
          href: "#featured-projects",
        },
        {
          src: "/images/featureprojects/othersProject/op6.png",
          alt: "Recent design preview 6",
          href: "#featured-projects",
        },
      ],
    },
    {
      images: [
        {
          src: "/images/featureprojects/othersProject/op7.webp",
          alt: "Recent design preview 7",
          href: "#featured-projects",
        },
        {
          src: "/images/featureprojects/othersProject/op8.webp",
          alt: "Recent design preview 8",
          href: "#featured-projects",
        },
      ],
    },
  ],
};

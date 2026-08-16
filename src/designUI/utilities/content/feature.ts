export interface FeatureLinkContent {
  label: string;
  href: string;
}

export interface FeatureContent {
  links: FeatureLinkContent[];
}

export const featureContent: FeatureContent = {
  links: [
    { label: "My Story", href: "#" },
    { label: "My Path To Mastery In UI/UX Design", href: "#" },
    { label: "Featured Projects", href: "#" },
  ],
};

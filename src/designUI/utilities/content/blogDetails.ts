import type { BlogIntro } from "./blog";

export interface BlogDetailsContent {
  backLabel: string;
  backHref: string;
  othersPostIntro: BlogIntro;
}

export const blogDetailsContent: BlogDetailsContent = {
  backLabel: "Back",
  backHref: "/blog",
  othersPostIntro: {
    badge: "Others Post",
    description: "",
  },
};

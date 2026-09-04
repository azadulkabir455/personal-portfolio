export interface NotFoundContent {
  code: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

export const notFoundContent: NotFoundContent = {
  code: "404",
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
  ctaLabel: "Back to Home",
  ctaLink: "/",
};

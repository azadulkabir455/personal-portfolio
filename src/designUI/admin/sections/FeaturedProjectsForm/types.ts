import { z } from "zod";

export const featuredProjectsFormSchema = z.object({
  badge: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  ctaLabel: z.string().min(1, "Button label is required"),
  ctaLink: z.string().min(1, "Button link is required"),
});

export type FeaturedProjectsFormValues = z.infer<typeof featuredProjectsFormSchema>;

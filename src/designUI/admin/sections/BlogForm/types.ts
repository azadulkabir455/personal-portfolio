import { z } from "zod";

export const blogFormSchema = z.object({
  landingIntro: z.object({
    badge: z.string().min(1, "Badge text is required"),
    description: z.string().min(1, "Description is required"),
  }),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;

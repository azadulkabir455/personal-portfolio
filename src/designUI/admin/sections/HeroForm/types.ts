import { z } from "zod";

export const heroFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  titleExtend: z.string().min(1, "This field is required"),
  greeting: z.string().min(1, "Greeting is required"),
  description: z.string().min(1, "Description is required"),
  ctaLabel: z.string().min(1, "Button label is required"),
  ctaLink: z.string().min(1, "Button link is required"),
  photo: z.string().nullable().refine((value) => Boolean(value), "Photo is required"),
  socialLinks: z
    .array(
      z.object({
        icon: z.string().min(1, "Select an icon"),
        url: z.string().min(1, "URL is required"),
      }),
    )
    .min(1, "Add at least one social link"),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;

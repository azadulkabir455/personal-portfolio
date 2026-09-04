import { z } from "zod";

export const featureFormSchema = z.object({
  links: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        href: z.string().min(1, "Link is required"),
      }),
    )
    .min(1, "Add at least one link"),
});

export type FeatureFormValues = z.infer<typeof featureFormSchema>;

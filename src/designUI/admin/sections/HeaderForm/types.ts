import { z } from "zod";

export const headerFormSchema = z.object({
  experienceLabel: z.string().min(1, "This field is required"),
  talkLabel: z.string().min(1, "Button label is required"),
  resumeLabel: z.string().min(1, "Button label is required"),
  navLinks: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        href: z.string().min(1, "Link is required"),
        enabled: z.boolean(),
      }),
    )
    .min(1, "Add at least one nav link"),
});

export type HeaderFormValues = z.infer<typeof headerFormSchema>;

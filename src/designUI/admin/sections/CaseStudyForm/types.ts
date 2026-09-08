import { z } from "zod";

const uploadedFileSchema = z.string().nullable().refine((value) => Boolean(value), "Image is required");

export const caseStudyFormSchema = z.object({
  slides: z
    .array(
      z.object({
        publishedLabel: z.string().min(1, "This field is required"),
        publishedDate: z.string().min(1, "Published date is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        ctaLabel: z.string().min(1, "Button label is required"),
        ctaLink: z.string().min(1, "Button link is required"),
        studyImage: uploadedFileSchema,
      }),
    )
    .min(1, "Add at least one slide"),
});

export type CaseStudyFormValues = z.infer<typeof caseStudyFormSchema>;

import { z } from "zod";

const uploadedFileSchema = z
  .custom<File | string | null>()
  .refine((value) => value !== null && value !== undefined && value !== "", {
    message: "Image is required",
  });

export const storyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  clientLogosHeading: z.string().min(1, "This field is required"),
  clientLogos: z
    .array(
      z.object({
        src: uploadedFileSchema,
        alt: z.string().min(1, "Alt text is required"),
        height: z
          .string()
          .min(1, "Height is required")
          .refine((value) => Number(value) > 0, "Height must be a positive number"),
      }),
    )
    .min(1, "Add at least one client logo"),
  processSteps: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        image: z.custom<File | string | null>().optional(),
        icon: z.boolean(),
      }),
    )
    .min(1, "Add at least one process step"),
  statsImageUrl: uploadedFileSchema,
  stats: z
    .array(
      z.object({
        value: z.string().min(1, "Value is required"),
        label: z.string().min(1, "Label is required"),
        description: z.string().min(1, "Description is required"),
      }),
    )
    .min(1, "Add at least one stat"),
});

export type StoryFormValues = z.infer<typeof storyFormSchema>;

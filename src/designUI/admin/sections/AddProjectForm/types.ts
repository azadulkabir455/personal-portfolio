import { z } from "zod";

const uploadedFileSchema = z
  .custom<File | string | null>()
  .refine((value) => value !== null && value !== undefined && value !== "", {
    message: "Image is required",
  });

export const addProjectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: uploadedFileSchema,
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  ctaLabel: z.string().optional(),
  ctaLink: z.string().optional(),
  secondaryCtaLabel: z.string().optional(),
  secondaryCtaHref: z.string().optional(),
});

export type AddProjectFormValues = z.infer<typeof addProjectFormSchema>;

export interface AddProjectFormProps {
  heading?: string;
  defaultValues?: Partial<AddProjectFormValues>;
}

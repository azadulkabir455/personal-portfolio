import { z } from "zod";

export const addProjectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().nullable().refine((value) => Boolean(value), "Cover image is required"),
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
  existingProjectId?: string;
}

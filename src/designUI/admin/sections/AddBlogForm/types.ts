import { z } from "zod";

const uploadedFileSchema = z
  .custom<File | string | null>()
  .refine((value) => value !== null && value !== undefined && value !== "", {
    message: "Image is required",
  });

export const addBlogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  image: uploadedFileSchema,
  category: z.string().min(1, "Select a category"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  content: z.string().min(1, "Content is required"),
});

export type AddBlogFormValues = z.infer<typeof addBlogFormSchema>;

export interface AddBlogFormProps {
  heading?: string;
  defaultValues?: Partial<AddBlogFormValues>;
}

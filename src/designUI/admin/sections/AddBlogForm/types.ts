import { z } from "zod";

export const addBlogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  image: z.custom<File | string | null>(),
  category: z.string().min(1, "Select a category"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  content: z.string().min(1, "Content is required"),
});

export type AddBlogFormValues = z.infer<typeof addBlogFormSchema>;

export interface AddBlogFormProps {
  heading?: string;
  defaultValues?: Partial<AddBlogFormValues>;
  existingPost?: { id: string; href: string };
}

import { z } from "zod";

export const privacyPolicyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  updatedAt: z.string().min(1, "Last updated date is required"),
  content: z.string().min(1, "Content is required"),
});

export type PrivacyPolicyFormValues = z.infer<typeof privacyPolicyFormSchema>;

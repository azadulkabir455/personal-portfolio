import { z } from "zod";

export const personalInfoFormSchema = z.object({
  cv: z.string().nullable().refine((value) => Boolean(value), "CV is required"),
  favicon: z.string().nullable(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  address: z.string().min(1, "Address is required"),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

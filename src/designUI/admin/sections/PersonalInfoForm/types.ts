import { z } from "zod";

export const personalInfoFormSchema = z.object({
  cv: z
    .custom<File | string | null>()
    .refine((value) => value !== null && value !== undefined && value !== "", {
      message: "CV is required",
    }),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

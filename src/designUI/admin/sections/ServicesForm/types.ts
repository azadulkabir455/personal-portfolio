import { z } from "zod";

export const servicesFormSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  items: z
    .array(
      z.object({
        number: z.string().min(1, "Number is required"),
        title: z.string().min(1, "Title is required"),
      }),
    )
    .min(1, "Add at least one service"),
});

export type ServicesFormValues = z.infer<typeof servicesFormSchema>;

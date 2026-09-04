import { z } from "zod";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

const uploadedFileSchema = z
  .custom<File | string | null>()
  .refine((value) => value !== null && value !== undefined && value !== "", {
    message: "Image is required",
  });

export const recentDesignFormSchema = z.object({
  text: z.string().min(1, "Text is required"),
  groups: z
    .array(
      z.object({
        href: z.string().min(1, "Link is required"),
        images: z
          .array(
            z.object({
              src: uploadedFileSchema,
              alt: z.string().min(1, "Alt text is required"),
            }),
          )
          .min(1, "Add at least one image"),
      }),
    )
    .min(1, "Add at least one group"),
});

export type RecentDesignFormValues = z.infer<typeof recentDesignFormSchema>;

export interface RecentDesignGroupCardProps {
  control: Control<RecentDesignFormValues>;
  register: UseFormRegister<RecentDesignFormValues>;
  errors: FieldErrors<RecentDesignFormValues>;
  index: number;
  onRemove: () => void;
}

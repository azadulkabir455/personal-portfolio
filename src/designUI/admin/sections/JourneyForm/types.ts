import { z } from "zod";

const uploadedFileSchema = z.string().nullable().refine((value) => Boolean(value), "Image is required");

const positiveNumberString = z
  .string()
  .min(1, "This field is required")
  .refine((value) => Number(value) > 0, "Must be a positive number");

export const journeyFormSchema = z.object({
  intro: z.object({
    preHeader: z.string().min(1, "This field is required"),
    paragraphPrimary: z.string().min(1, "This field is required"),
    paragraphSecondary: z.string().min(1, "This field is required"),
    ctaLabel: z.string().min(1, "Button label is required"),
    subHeading: z.string().min(1, "This field is required"),
  }),
  steps: z
    .array(
      z.object({
        step: z.string().min(1, "Step label is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
      }),
    )
    .min(1, "Add at least one step"),
  toolkit: z.object({
    toolsTitle: z.string().min(1, "This field is required"),
    tools: z
      .array(
        z.object({
          name: z.string().min(1, "Name is required"),
          icon: uploadedFileSchema,
        }),
      )
      .min(1, "Add at least one tool"),
    certificationsTitle: z.string().min(1, "This field is required"),
    certificates: z
      .array(
        z
          .object({
            title: z.string().min(1, "Title is required"),
            image: uploadedFileSchema,
            width: positiveNumberString,
            height: positiveNumberString,
            isLinkable: z.boolean(),
            link: z.string().optional(),
          })
          .superRefine((certificate, ctx) => {
            if (certificate.isLinkable && !certificate.link?.trim()) {
              ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Link is required", path: ["link"] });
            }
          }),
      )
      .min(1, "Add at least one certificate"),
  }),
});

export type JourneyFormValues = z.infer<typeof journeyFormSchema>;

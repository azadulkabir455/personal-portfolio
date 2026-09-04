import { z } from "zod";

const uploadedFileSchema = z
  .custom<File | string | null>()
  .refine((value) => value !== null && value !== undefined && value !== "", {
    message: "Image is required",
  });

export const footerFormSchema = z.object({
  profile: z.object({
    name: z.string().min(1, "Name is required"),
    tagline: z.string().min(1, "Tagline is required"),
    image: uploadedFileSchema,
    availabilityLabel: z.string().min(1, "This field is required"),
    availability: z.string().min(1, "Add at least one availability option"),
    resumeLabel: z.string().min(1, "Button label is required"),
    ctaLabel: z.string().min(1, "Button label is required"),
    contactPrompt: z.string().min(1, "This field is required"),
    email: z.string().min(1, "Email is required"),
  }),
  social: z.object({
    heading: z.string().min(1, "Heading is required"),
    description: z.string().min(1, "Description is required"),
    findMeLabel: z.string().min(1, "This field is required"),
    links: z.array(
      z.object({
        icon: z.string().min(1, "Select an icon"),
        href: z.string().min(1, "Link is required"),
      }),
    ),
  }),
  legal: z.object({
    copyrightName: z.string().min(1, "Name is required"),
    copyrightNameHref: z.string().min(1, "Link is required"),
    links: z
      .array(
        z.object({
          label: z.string().min(1, "Label is required"),
          href: z.string().min(1, "Link is required"),
        }),
      )
      .min(1, "Add at least one legal link"),
    developedByLabel: z.string().min(1, "This field is required"),
    developedByName: z.string().min(1, "This field is required"),
    developedByHref: z.string().optional(),
  }),
});

export type FooterFormValues = z.infer<typeof footerFormSchema>;

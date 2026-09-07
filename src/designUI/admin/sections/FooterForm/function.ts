"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { footerContent } from "@/designUI/utilities/content/footer";
import { saveSectionContent } from "@/firebase/sectionContent";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { footerFormSchema, type FooterFormValues } from "./types";

export function useFooterForm() {
  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerFormSchema),
    defaultValues: {
      profile: {
        ...footerContent.profile,
        availability: footerContent.profile.availability.join(", "),
      },
      social: {
        ...footerContent.social,
        links: footerContent.social.links.map((link) => ({
          icon: link.icon.name,
          href: link.href,
        })),
      },
      legal: footerContent.legal,
    },
  });

  const socialLinksArray = useFieldArray({ control: form.control, name: "social.links" });
  const legalLinksArray = useFieldArray({ control: form.control, name: "legal.links" });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const image = resolveStringValue(values.profile.image, footerContent.profile.image);

      await saveSectionContent("footer", {
        profile: {
          ...values.profile,
          image,
          availability: values.profile.availability.split(",").map((item) => item.trim()),
        },
        social: {
          ...values.social,
          links: values.social.links.map((link) => ({ icon: { name: link.icon }, href: link.href })),
        },
        legal: values.legal,
      });
      form.reset({ ...values, profile: { ...values.profile, image } });
    }),
  );

  return { form, onSubmit, socialLinksArray, legalLinksArray, status };
}

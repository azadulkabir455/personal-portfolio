"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { footerContent } from "@/designUI/utilities/content/footer";
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

  const onSubmit = form.handleSubmit((values) => {
    console.log("Footer form submitted", {
      ...values,
      profile: {
        ...values.profile,
        availability: values.profile.availability.split(",").map((item) => item.trim()),
      },
    });
  });

  return { form, onSubmit, socialLinksArray, legalLinksArray };
}

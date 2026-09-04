"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroContent } from "@/designUI/utilities/content/hero";
import { heroFormSchema, type HeroFormValues } from "./types";

export function useHeroForm() {
  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      title: heroContent.title,
      titleExtend: heroContent.titleExtend,
      greeting: heroContent.greeting,
      description: heroContent.description,
      ctaLabel: heroContent.ctaLabel,
      ctaLink: heroContent.ctaLink,
      photo: heroContent.photoUrl,
      socialLinks: heroContent.socialLinks.map((link) => ({
        icon: link.icon.name,
        url: link.url,
      })),
    },
  });

  const socialLinksArray = useFieldArray({ control: form.control, name: "socialLinks" });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Hero form submitted", values);
  });

  return { form, onSubmit, socialLinksArray };
}

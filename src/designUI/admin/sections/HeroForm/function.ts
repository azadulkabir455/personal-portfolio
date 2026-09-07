"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroContent } from "@/designUI/utilities/content/hero";
import { saveSectionContent } from "@/firebase/sectionContent";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
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
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const photoUrl = resolveStringValue(values.photo, heroContent.photoUrl);

      await saveSectionContent("hero", {
        title: values.title,
        titleExtend: values.titleExtend,
        greeting: values.greeting,
        description: values.description,
        ctaLabel: values.ctaLabel,
        ctaLink: values.ctaLink,
        photoUrl,
        socialLinks: values.socialLinks.map((link) => ({ icon: { name: link.icon }, url: link.url })),
      });
      form.reset({ ...values, photo: photoUrl });
    }),
  );

  return { form, onSubmit, socialLinksArray, status };
}

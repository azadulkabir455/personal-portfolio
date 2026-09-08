"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroContent, type HeroContent } from "@/designUI/utilities/content/hero";
import { saveSectionContent } from "@/firebase/sectionContent";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { heroFormSchema, type HeroFormValues } from "./types";

function toFormValues(data: HeroContent): HeroFormValues {
  return {
    title: data.title,
    titleExtend: data.titleExtend ?? "",
    greeting: data.greeting,
    description: data.description,
    ctaLabel: data.ctaLabel,
    ctaLink: data.ctaLink,
    photo: data.photoUrl,
    socialLinks: data.socialLinks.map((link) => ({ icon: link.icon.name, url: link.url })),
  };
}

export function useHeroForm() {
  const { data, isLoading: isContentLoading } = useSectionContent("hero", heroContent);
  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: toFormValues(heroContent),
  });

  const savedPhotoRef = useRef<string | null>(data.photoUrl ?? null);

  useEffect(() => {
    form.reset(toFormValues(data));
    savedPhotoRef.current = data.photoUrl ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const socialLinksArray = useFieldArray({ control: form.control, name: "socialLinks" });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const photoUrl = values.photo as string;

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
      cleanupReplacedFiles([savedPhotoRef.current], [photoUrl]);
      savedPhotoRef.current = photoUrl;
      form.reset({ ...values, photo: photoUrl });
    }),
  );

  return { form, onSubmit, socialLinksArray, status, isContentLoading };
}

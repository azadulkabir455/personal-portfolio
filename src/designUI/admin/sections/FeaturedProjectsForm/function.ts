"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { featuredProjectsFormSchema, type FeaturedProjectsFormValues } from "./types";

export function useFeaturedProjectsForm() {
  const form = useForm<FeaturedProjectsFormValues>({
    resolver: zodResolver(featuredProjectsFormSchema),
    defaultValues: {
      badge: featuredProjectsContent.intro.badge,
      description: featuredProjectsContent.intro.description,
      ctaLabel: featuredProjectsContent.cta.label,
      ctaLink: featuredProjectsContent.cta.link,
    },
  });
  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await saveSectionContent("featuredProjects", {
        intro: { badge: values.badge, description: values.description },
        cta: { label: values.ctaLabel, link: values.ctaLink },
      });
      form.reset(values);
    }),
  );

  return { form, onSubmit, status };
}

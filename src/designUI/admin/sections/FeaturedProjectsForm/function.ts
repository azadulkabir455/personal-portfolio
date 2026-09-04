"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
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

  const onSubmit = form.handleSubmit((values) => {
    console.log("Featured Projects form submitted", values);
  });

  return { form, onSubmit };
}

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  featuredProjectsContent,
  type FeaturedProjectsContent,
} from "@/designUI/utilities/content/featuredProjects";
import { saveSectionContent } from "@/firebase/sectionContent";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { featuredProjectsFormSchema, type FeaturedProjectsFormValues } from "./types";

function toFormValues(data: FeaturedProjectsContent): FeaturedProjectsFormValues {
  return {
    badge: data.intro.badge,
    description: data.intro.description,
    ctaLabel: data.cta.label,
  };
}

export function useFeaturedProjectsForm() {
  const { data } = useSectionContent("featuredProjects", featuredProjectsContent);
  const form = useForm<FeaturedProjectsFormValues>({
    resolver: zodResolver(featuredProjectsFormSchema),
    defaultValues: toFormValues(featuredProjectsContent),
  });

  useEffect(() => {
    form.reset(toFormValues(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      await saveSectionContent("featuredProjects", {
        intro: { badge: values.badge, description: values.description },
        cta: { label: values.ctaLabel },
      });
      form.reset(values);
    }),
  );

  return { form, onSubmit, status };
}

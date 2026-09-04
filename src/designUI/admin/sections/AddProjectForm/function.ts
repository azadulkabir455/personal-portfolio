"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { addProjectFormSchema, type AddProjectFormValues } from "./types";

export function useAddProjectForm(defaultValues?: Partial<AddProjectFormValues>) {
  const form = useForm<AddProjectFormValues>({
    resolver: zodResolver(addProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
      tags: [],
      ctaLabel: "",
      ctaLink: "",
      secondaryCtaLabel: "",
      secondaryCtaHref: "",
      ...defaultValues,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Project submitted", values);
  });

  return { form, onSubmit, tagOptions: featuredProjectsContent.availableTags };
}

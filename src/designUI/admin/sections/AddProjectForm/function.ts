"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteField } from "firebase/firestore";
import { featuredProjectsContent } from "@/designUI/utilities/content/featuredProjects";
import { createProject, updateProject } from "@/firebase/projectService";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { addProjectFormSchema, type AddProjectFormValues } from "./types";

export function useAddProjectForm(
  defaultValues?: Partial<AddProjectFormValues>,
  existingProjectId?: string,
) {
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

  const router = useRouter();
  const { status, run } = useSaveStatus();

  const existingImage = typeof defaultValues?.image === "string" ? defaultValues.image : undefined;

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const image = values.image as string;
      const secondaryCta =
        values.secondaryCtaLabel && values.secondaryCtaHref
          ? { label: values.secondaryCtaLabel, href: values.secondaryCtaHref }
          : undefined;

      const base = {
        title: values.title,
        description: values.description,
        image,
        tags: values.tags,
        publishedDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };

      if (existingProjectId) {
        await updateProject(existingProjectId, {
          ...base,
          ctaLabel: values.ctaLabel || deleteField(),
          ctaLink: values.ctaLink || deleteField(),
          secondaryCta: secondaryCta ?? deleteField(),
        });
      } else {
        await createProject({
          ...base,
          ctaLabel: values.ctaLabel || undefined,
          ctaLink: values.ctaLink || undefined,
          secondaryCta,
        });
      }

      cleanupReplacedFiles([existingImage], [image]);
      router.push("/admin/project");
    }),
  );

  return { form, onSubmit, status, tagOptions: featuredProjectsContent.availableTags };
}

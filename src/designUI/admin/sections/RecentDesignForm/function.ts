"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recentDesignContent } from "@/designUI/utilities/content/recentDesign";
import { saveSectionContent } from "@/firebase/sectionContent";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { recentDesignFormSchema, type RecentDesignFormValues } from "./types";

export function useRecentDesignForm() {
  const form = useForm<RecentDesignFormValues>({
    resolver: zodResolver(recentDesignFormSchema),
    defaultValues: {
      text: recentDesignContent.intro.text,
      groups: recentDesignContent.groups,
    },
  });

  const groupsArray = useFieldArray({ control: form.control, name: "groups" });

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const groups = values.groups.map((group, groupIndex) => ({
        images: group.images.map((image, imageIndex) => ({
          src: resolveStringValue(image.src, recentDesignContent.groups[groupIndex]?.images[imageIndex]?.src),
          alt: image.alt,
          href: image.href,
        })),
      }));

      await saveSectionContent("recentDesign", { intro: { text: values.text }, groups });

      form.reset({
        text: values.text,
        groups: values.groups.map((group, groupIndex) => ({
          ...group,
          images: group.images.map((image, imageIndex) => ({
            ...image,
            src: groups[groupIndex].images[imageIndex].src,
          })),
        })),
      });
    }),
  );

  return { form, onSubmit, groupsArray, status };
}

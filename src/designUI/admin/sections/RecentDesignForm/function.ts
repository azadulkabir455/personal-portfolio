"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recentDesignContent, type RecentDesignContent } from "@/designUI/utilities/content/recentDesign";
import { saveSectionContent } from "@/firebase/sectionContent";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { recentDesignFormSchema, type RecentDesignFormValues } from "./types";

function toFormValues(data: RecentDesignContent): RecentDesignFormValues {
  return {
    text: data.intro.text,
    groups: data.groups,
  };
}

function flattenImageUrls(groups: RecentDesignContent["groups"]) {
  return groups.flatMap((group) => group.images.map((image) => image.src));
}

export function useRecentDesignForm() {
  const { data, isLoading: isContentLoading } = useSectionContent("recentDesign", recentDesignContent);
  const form = useForm<RecentDesignFormValues>({
    resolver: zodResolver(recentDesignFormSchema),
    defaultValues: toFormValues(recentDesignContent),
  });

  const savedImageUrlsRef = useRef(flattenImageUrls(data.groups));

  useEffect(() => {
    form.reset(toFormValues(data));
    savedImageUrlsRef.current = flattenImageUrls(data.groups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const groupsArray = useFieldArray({ control: form.control, name: "groups" });

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const groups = values.groups.map((group) => ({
        images: group.images.map((image) => ({
          src: image.src as string,
          alt: image.alt,
          href: image.href,
        })),
      }));

      await saveSectionContent("recentDesign", { intro: { text: values.text }, groups });

      cleanupReplacedFiles(savedImageUrlsRef.current, flattenImageUrls(groups));
      savedImageUrlsRef.current = flattenImageUrls(groups);

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

  return { form, onSubmit, groupsArray, status, isContentLoading };
}

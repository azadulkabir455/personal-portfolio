"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storyContent } from "@/designUI/utilities/content/story";
import { storyFormSchema, type StoryFormValues } from "./types";

export function useStoryForm() {
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: storyContent.title,
      description: storyContent.description,
      clientLogosHeading: storyContent.clientLogosHeading,
      clientLogos: storyContent.clientLogos.map((logo) => ({
        src: logo.src,
        alt: logo.alt,
        height: String(logo.height),
      })),
      processSteps: storyContent.processSteps.map((step) => ({
        label: step.label,
        image: step.image ?? null,
        icon: step.icon ?? false,
      })),
      statsImageUrl: storyContent.statsImageUrl,
      stats: storyContent.stats,
    },
  });

  const clientLogosArray = useFieldArray({ control: form.control, name: "clientLogos" });
  const processStepsArray = useFieldArray({ control: form.control, name: "processSteps" });
  const statsArray = useFieldArray({ control: form.control, name: "stats" });

  const onSubmit = form.handleSubmit((values) => {
    console.log("Story form submitted", values);
  });

  return { form, onSubmit, clientLogosArray, processStepsArray, statsArray };
}

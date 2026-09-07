"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storyContent } from "@/designUI/utilities/content/story";
import { saveSectionContent } from "@/firebase/sectionContent";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
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

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const clientLogos = values.clientLogos.map((logo, index) => ({
        src: resolveStringValue(logo.src, storyContent.clientLogos[index]?.src),
        alt: logo.alt,
        height: Number(logo.height),
      }));
      const processSteps = values.processSteps.map((step, index) => ({
        label: step.label,
        className: storyContent.processSteps[index]?.className ?? "",
        image: resolveStringValue(step.image, storyContent.processSteps[index]?.image),
        icon: step.icon,
      }));
      const statsImageUrl = resolveStringValue(values.statsImageUrl, storyContent.statsImageUrl);

      await saveSectionContent("story", {
        title: values.title,
        description: values.description,
        clientLogosHeading: values.clientLogosHeading,
        clientLogos,
        processSteps,
        statsImageUrl,
        stats: values.stats,
      });

      form.reset({
        ...values,
        clientLogos: values.clientLogos.map((logo, index) => ({
          ...logo,
          src: clientLogos[index].src,
        })),
        processSteps: values.processSteps.map((step, index) => ({
          ...step,
          image: processSteps[index].image,
        })),
        statsImageUrl,
      });
    }),
  );

  return { form, onSubmit, clientLogosArray, processStepsArray, statsArray, status };
}

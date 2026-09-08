"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storyContent, type StoryContent } from "@/designUI/utilities/content/story";
import { saveSectionContent } from "@/firebase/sectionContent";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { storyFormSchema, type StoryFormValues } from "./types";

function toFormValues(data: StoryContent): StoryFormValues {
  return {
    title: data.title,
    description: data.description,
    clientLogosHeading: data.clientLogosHeading,
    clientLogos: data.clientLogos.map((logo) => ({
      src: logo.src,
      alt: logo.alt,
      height: String(logo.height),
    })),
    processSteps: data.processSteps.map((step) => ({
      label: step.label,
      image: step.image ?? null,
      icon: step.icon ?? false,
    })),
    statsImageUrl: data.statsImageUrl,
    stats: data.stats,
  };
}

export function useStoryForm() {
  const { data, isLoading: isContentLoading } = useSectionContent("story", storyContent);
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: toFormValues(storyContent),
  });

  const savedClientLogoUrlsRef = useRef(data.clientLogos.map((logo) => logo.src));
  const savedProcessStepImageUrlsRef = useRef(data.processSteps.map((step) => step.image ?? null));
  const savedStatsImageUrlRef = useRef<string | null>(data.statsImageUrl);

  useEffect(() => {
    form.reset(toFormValues(data));
    savedClientLogoUrlsRef.current = data.clientLogos.map((logo) => logo.src);
    savedProcessStepImageUrlsRef.current = data.processSteps.map((step) => step.image ?? null);
    savedStatsImageUrlRef.current = data.statsImageUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const clientLogosArray = useFieldArray({ control: form.control, name: "clientLogos" });
  const processStepsArray = useFieldArray({ control: form.control, name: "processSteps" });
  const statsArray = useFieldArray({ control: form.control, name: "stats" });

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const clientLogos = values.clientLogos.map((logo) => ({
        src: logo.src as string,
        alt: logo.alt,
        height: Number(logo.height),
      }));
      const processSteps = values.processSteps.map((step, index) => ({
        label: step.label,
        className: storyContent.processSteps[index]?.className ?? "",
        image: step.image ?? undefined,
        icon: step.icon,
      }));
      const statsImageUrl = values.statsImageUrl as string;

      await saveSectionContent("story", {
        title: values.title,
        description: values.description,
        clientLogosHeading: values.clientLogosHeading,
        clientLogos,
        processSteps,
        statsImageUrl,
        stats: values.stats,
      });

      cleanupReplacedFiles(
        [
          ...savedClientLogoUrlsRef.current,
          ...savedProcessStepImageUrlsRef.current,
          savedStatsImageUrlRef.current,
        ],
        [...clientLogos.map((logo) => logo.src), ...processSteps.map((step) => step.image), statsImageUrl],
      );
      savedClientLogoUrlsRef.current = clientLogos.map((logo) => logo.src);
      savedProcessStepImageUrlsRef.current = processSteps.map((step) => step.image ?? null);
      savedStatsImageUrlRef.current = statsImageUrl;

      form.reset({
        ...values,
        clientLogos: values.clientLogos.map((logo, index) => ({
          ...logo,
          src: clientLogos[index].src,
        })),
        processSteps: values.processSteps.map((step, index) => ({
          ...step,
          image: processSteps[index].image ?? null,
        })),
        statsImageUrl,
      });
    }),
  );

  return { form, onSubmit, clientLogosArray, processStepsArray, statsArray, status, isContentLoading };
}

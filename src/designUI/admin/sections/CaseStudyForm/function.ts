"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caseStudyContent } from "@/designUI/utilities/content/caseStudy";
import { saveSectionContent } from "@/firebase/sectionContent";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { caseStudyFormSchema, type CaseStudyFormValues } from "./types";

export function useCaseStudyForm() {
  const form = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues: {
      slides: caseStudyContent.slides.map((slide) => ({
        publishedLabel: slide.publishedLabel,
        publishedDate: slide.publishedDate,
        title: slide.title,
        description: slide.description,
        ctaLabel: slide.ctaLabel,
        ctaLink: slide.ctaLink,
        studyImage: slide.studyImage,
      })),
    },
  });

  const slidesArray = useFieldArray({ control: form.control, name: "slides" });

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const slides = values.slides.map((slide, index) => ({
        publishedLabel: slide.publishedLabel,
        publishedDate: slide.publishedDate,
        title: slide.title,
        description: slide.description,
        ctaLabel: slide.ctaLabel,
        ctaLink: slide.ctaLink,
        images: caseStudyContent.slides[index]?.images ?? caseStudyContent.slides[0].images,
        studyImage: resolveStringValue(slide.studyImage, caseStudyContent.slides[index]?.studyImage),
      }));

      await saveSectionContent("caseStudy", { slides });

      form.reset({
        slides: values.slides.map((slide, index) => ({ ...slide, studyImage: slides[index].studyImage })),
      });
    }),
  );

  return { form, onSubmit, slidesArray, status };
}

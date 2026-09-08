"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caseStudyContent, type CaseStudyContent } from "@/designUI/utilities/content/caseStudy";
import { saveSectionContent } from "@/firebase/sectionContent";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { caseStudyFormSchema, type CaseStudyFormValues } from "./types";

function toFormValues(data: CaseStudyContent): CaseStudyFormValues {
  return {
    slides: data.slides.map((slide) => ({
      publishedLabel: slide.publishedLabel,
      publishedDate: slide.publishedDate,
      title: slide.title,
      description: slide.description,
      ctaLabel: slide.ctaLabel,
      ctaLink: slide.ctaLink,
      studyImage: slide.studyImage,
    })),
  };
}

export function useCaseStudyForm() {
  const { data, isLoading: isContentLoading } = useSectionContent("caseStudy", caseStudyContent);
  const form = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues: toFormValues(caseStudyContent),
  });

  const savedStudyImagesRef = useRef(data.slides.map((slide) => slide.studyImage));

  useEffect(() => {
    form.reset(toFormValues(data));
    savedStudyImagesRef.current = data.slides.map((slide) => slide.studyImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        images: data.slides[index]?.images ?? caseStudyContent.slides[0].images,
        studyImage: slide.studyImage as string,
      }));

      await saveSectionContent("caseStudy", { slides });

      cleanupReplacedFiles(savedStudyImagesRef.current, slides.map((slide) => slide.studyImage));
      savedStudyImagesRef.current = slides.map((slide) => slide.studyImage);

      form.reset({
        slides: values.slides.map((slide, index) => ({ ...slide, studyImage: slides[index].studyImage })),
      });
    }),
  );

  return { form, onSubmit, slidesArray, status, isContentLoading };
}

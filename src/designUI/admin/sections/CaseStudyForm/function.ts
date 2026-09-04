"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caseStudyContent } from "@/designUI/utilities/content/caseStudy";
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

  const onSubmit = form.handleSubmit((values) => {
    console.log("Case Study form submitted", values);
  });

  return { form, onSubmit, slidesArray };
}

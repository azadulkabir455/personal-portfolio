"use client";

import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { journeyContent, type JourneyContent } from "@/designUI/utilities/content/journey";
import { saveSectionContent } from "@/firebase/sectionContent";
import { cleanupReplacedFiles } from "@/lib/uploadClient";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { useSectionContent } from "@/customHooks/useSectionContent";
import { journeyFormSchema, type JourneyFormValues } from "./types";

function toFormValues(data: JourneyContent): JourneyFormValues {
  return {
    intro: data.intro,
    steps: data.steps,
    toolkit: {
      toolsTitle: data.toolkit.toolsTitle,
      tools: data.toolkit.tools.map((tool) => ({ name: tool.name, icon: tool.icon })),
      certificationsTitle: data.toolkit.certificationsTitle,
      certificates: data.toolkit.certificates.map((certificate) => ({
        title: certificate.title,
        image: certificate.image,
        width: String(certificate.width),
        height: String(certificate.height),
        link: certificate.link,
      })),
    },
  };
}

export function useJourneyForm() {
  const { data, isLoading: isContentLoading } = useSectionContent("journey", journeyContent);
  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeyFormSchema),
    defaultValues: toFormValues(journeyContent),
  });

  const savedToolIconsRef = useRef(data.toolkit.tools.map((tool) => tool.icon));
  const savedCertificateImagesRef = useRef(data.toolkit.certificates.map((cert) => cert.image));

  useEffect(() => {
    form.reset(toFormValues(data));
    savedToolIconsRef.current = data.toolkit.tools.map((tool) => tool.icon);
    savedCertificateImagesRef.current = data.toolkit.certificates.map((cert) => cert.image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const stepsArray = useFieldArray({ control: form.control, name: "steps" });
  const toolsArray = useFieldArray({ control: form.control, name: "toolkit.tools" });
  const certificatesArray = useFieldArray({ control: form.control, name: "toolkit.certificates" });

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const tools = values.toolkit.tools.map((tool) => ({
        name: tool.name,
        icon: tool.icon as string,
      }));
      const certificates = values.toolkit.certificates.map((certificate) => ({
        title: certificate.title,
        image: certificate.image as string,
        width: Number(certificate.width),
        height: Number(certificate.height),
        link: certificate.link,
      }));

      await saveSectionContent("journey", {
        intro: values.intro,
        steps: values.steps,
        toolkit: {
          toolsTitle: values.toolkit.toolsTitle,
          tools,
          certificationsTitle: values.toolkit.certificationsTitle,
          certificates,
        },
      });

      cleanupReplacedFiles(
        [...savedToolIconsRef.current, ...savedCertificateImagesRef.current],
        [...tools.map((tool) => tool.icon), ...certificates.map((cert) => cert.image)],
      );
      savedToolIconsRef.current = tools.map((tool) => tool.icon);
      savedCertificateImagesRef.current = certificates.map((cert) => cert.image);

      form.reset({
        ...values,
        toolkit: {
          ...values.toolkit,
          tools: values.toolkit.tools.map((tool, index) => ({ ...tool, icon: tools[index].icon })),
          certificates: values.toolkit.certificates.map((certificate, index) => ({
            ...certificate,
            image: certificates[index].image,
          })),
        },
      });
    }),
  );

  return { form, onSubmit, stepsArray, toolsArray, certificatesArray, status, isContentLoading };
}

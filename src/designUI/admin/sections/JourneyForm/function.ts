"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { journeyContent } from "@/designUI/utilities/content/journey";
import { saveSectionContent } from "@/firebase/sectionContent";
import { resolveStringValue } from "@/designUI/utilities/resolveStringValue";
import { useSaveStatus } from "@/customHooks/useSaveStatus";
import { journeyFormSchema, type JourneyFormValues } from "./types";

export function useJourneyForm() {
  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeyFormSchema),
    defaultValues: {
      intro: journeyContent.intro,
      steps: journeyContent.steps,
      toolkit: {
        toolsTitle: journeyContent.toolkit.toolsTitle,
        tools: journeyContent.toolkit.tools.map((tool) => ({
          name: tool.name,
          icon: tool.icon,
        })),
        certificationsTitle: journeyContent.toolkit.certificationsTitle,
        certificates: journeyContent.toolkit.certificates.map((certificate) => ({
          title: certificate.title,
          image: certificate.image,
          width: String(certificate.width),
          height: String(certificate.height),
          link: certificate.link,
        })),
      },
    },
  });

  const stepsArray = useFieldArray({ control: form.control, name: "steps" });
  const toolsArray = useFieldArray({ control: form.control, name: "toolkit.tools" });
  const certificatesArray = useFieldArray({ control: form.control, name: "toolkit.certificates" });

  const { status, run } = useSaveStatus();

  const onSubmit = form.handleSubmit((values) =>
    run(async () => {
      const tools = values.toolkit.tools.map((tool, index) => ({
        name: tool.name,
        icon: resolveStringValue(tool.icon, journeyContent.toolkit.tools[index]?.icon),
      }));
      const certificates = values.toolkit.certificates.map((certificate, index) => ({
        title: certificate.title,
        image: resolveStringValue(certificate.image, journeyContent.toolkit.certificates[index]?.image),
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

  return { form, onSubmit, stepsArray, toolsArray, certificatesArray, status };
}

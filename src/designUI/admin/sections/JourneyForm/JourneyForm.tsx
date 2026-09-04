"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import { useJourneyForm } from "./function";

const dividerClassName =
  "mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8";

const removeButtonClassName =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8]";

export default function JourneyForm() {
  const { form, onSubmit, stepsArray, toolsArray, certificatesArray } = useJourneyForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Journey Section"
      description="Content shown in the landing page journey section."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Input
        id="intro.preHeader"
        label="Pre Header"
        error={errors.intro?.preHeader?.message}
        {...register("intro.preHeader")}
      />
      <Input
        id="intro.subHeading"
        label="Sub Heading"
        error={errors.intro?.subHeading?.message}
        {...register("intro.subHeading")}
      />

      <Textarea
        id="intro.paragraphPrimary"
        label="Paragraph Primary"
        containerClassName="md:col-span-2"
        error={errors.intro?.paragraphPrimary?.message}
        {...register("intro.paragraphPrimary")}
      />
      <Textarea
        id="intro.paragraphSecondary"
        label="Paragraph Secondary"
        containerClassName="md:col-span-2"
        error={errors.intro?.paragraphSecondary?.message}
        {...register("intro.paragraphSecondary")}
      />

      <Input
        id="intro.ctaLabel"
        label="Button Label"
        error={errors.intro?.ctaLabel?.message}
        {...register("intro.ctaLabel")}
      />
      <Input
        id="intro.ctaLink"
        label="Button Link"
        error={errors.intro?.ctaLink?.message}
        {...register("intro.ctaLink")}
      />

      <Container className={dividerClassName}>
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Steps</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => stepsArray.append({ step: "", title: "", description: "" })}
          >
            + Add Step
          </Button>
        </Container>

        {stepsArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="flex flex-col gap-4 rounded-[12px] border border-[#E4E4E4] p-4"
          >
            <Container className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">
                Step {index + 1}
              </span>
              <button
                type="button"
                onClick={() => stepsArray.remove(index)}
                aria-label="Remove step"
                className={removeButtonClassName}
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
            </Container>

            <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                id={`steps.${index}.step`}
                label="Step Label"
                error={errors.steps?.[index]?.step?.message}
                {...register(`steps.${index}.step`)}
              />
              <Input
                id={`steps.${index}.title`}
                label="Title"
                error={errors.steps?.[index]?.title?.message}
                {...register(`steps.${index}.title`)}
              />
            </Container>

            <Textarea
              id={`steps.${index}.description`}
              label="Description"
              error={errors.steps?.[index]?.description?.message}
              {...register(`steps.${index}.description`)}
            />
          </Container>
        ))}
      </Container>

      <Container className={dividerClassName}>
        <Input
          id="toolkit.toolsTitle"
          label="Tools Title"
          error={errors.toolkit?.toolsTitle?.message}
          {...register("toolkit.toolsTitle")}
        />

        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Tools</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => toolsArray.append({ name: "", icon: null })}
          >
            + Add Tool
          </Button>
        </Container>

        {toolsArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="flex flex-col gap-4 rounded-[12px] border border-[#E4E4E4] p-4"
          >
            <Container className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">
                Tool {index + 1}
              </span>
              <button
                type="button"
                onClick={() => toolsArray.remove(index)}
                aria-label="Remove tool"
                className={removeButtonClassName}
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
            </Container>

            <Container className="flex flex-col gap-4 md:flex-row md:items-end">
              <Controller
                control={control}
                name={`toolkit.tools.${index}.icon`}
                render={({ field: iconField }) => (
                  <FileInput
                    label="Icon"
                    value={iconField.value}
                    onChange={iconField.onChange}
                    error={errors.toolkit?.tools?.[index]?.icon?.message}
                    containerClassName="w-full md:max-w-[160px] md:shrink-0"
                  />
                )}
              />
              <Input
                id={`toolkit.tools.${index}.name`}
                label="Name"
                containerClassName="w-full"
                error={errors.toolkit?.tools?.[index]?.name?.message}
                {...register(`toolkit.tools.${index}.name`)}
              />
            </Container>
          </Container>
        ))}
      </Container>

      <Container className={dividerClassName}>
        <Input
          id="toolkit.certificationsTitle"
          label="Certifications Title"
          error={errors.toolkit?.certificationsTitle?.message}
          {...register("toolkit.certificationsTitle")}
        />

        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Certificates</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() =>
              certificatesArray.append({ title: "", image: null, width: "500", height: "366" })
            }
          >
            + Add Certificate
          </Button>
        </Container>

        {certificatesArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="flex flex-col gap-4 rounded-[12px] border border-[#E4E4E4] p-4"
          >
            <Container className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">
                Certificate {index + 1}
              </span>
              <button
                type="button"
                onClick={() => certificatesArray.remove(index)}
                aria-label="Remove certificate"
                className={removeButtonClassName}
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
            </Container>

            <Container className="flex flex-col gap-4 md:flex-row md:items-end">
              <Controller
                control={control}
                name={`toolkit.certificates.${index}.image`}
                render={({ field: imageField }) => (
                  <FileInput
                    label="Certificate Image"
                    value={imageField.value}
                    onChange={imageField.onChange}
                    error={errors.toolkit?.certificates?.[index]?.image?.message}
                    containerClassName="w-full md:max-w-[220px] md:shrink-0"
                  />
                )}
              />

              <Container className="flex w-full flex-col gap-4">
                <Input
                  id={`toolkit.certificates.${index}.title`}
                  label="Title"
                  error={errors.toolkit?.certificates?.[index]?.title?.message}
                  {...register(`toolkit.certificates.${index}.title`)}
                />
                <span className="font-sans text-[11px] font-semibold text-[#8A8A86] lg:text-[12px]">
                  Image Resolution
                </span>
                <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    id={`toolkit.certificates.${index}.width`}
                    type="number"
                    label="Width (px)"
                    error={errors.toolkit?.certificates?.[index]?.width?.message}
                    {...register(`toolkit.certificates.${index}.width`)}
                  />
                  <Input
                    id={`toolkit.certificates.${index}.height`}
                    type="number"
                    label="Height (px)"
                    error={errors.toolkit?.certificates?.[index]?.height?.message}
                    {...register(`toolkit.certificates.${index}.height`)}
                  />
                </Container>
              </Container>
            </Container>
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}

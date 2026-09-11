"use client";

import clsx from "clsx";
import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import Switch from "@/designUI/elements/formElement/Switch/Switch";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import SaveButton from "@/designUI/elements/SaveButton/SaveButton";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import ConfirmDialog from "@/designUI/elements/ConfirmDialog/ConfirmDialog";
import { useConfirmDialog } from "@/designUI/elements/ConfirmDialog/function";
import { useJourneyForm } from "./function";

const dividerClassName =
  "mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8";

const removeButtonClassName =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8]";

export default function JourneyForm() {
  const { form, onSubmit, stepsArray, toolsArray, certificatesArray, status, isContentLoading } =
    useJourneyForm();
  const { register, control, formState, watch } = form;
  const { errors } = formState;
  const confirmDialog = useConfirmDialog();

  const confirmRemoveStep = (index: number) => {
    confirmDialog.openConfirm({
      title: "Remove this step?",
      message: "This step will be removed from the list.",
      onConfirm: () => stepsArray.remove(index),
    });
  };

  const confirmRemoveTool = (index: number) => {
    confirmDialog.openConfirm({
      title: "Remove this tool?",
      message: "This tool will be removed from the list.",
      onConfirm: () => toolsArray.remove(index),
    });
  };

  const confirmRemoveCertificate = (index: number) => {
    confirmDialog.openConfirm({
      title: "Remove this certificate?",
      message: "This certificate will be removed from the list.",
      onConfirm: () => certificatesArray.remove(index),
    });
  };

  return (
    <FormContainer
      title="Journey Section"
      description="Content shown in the landing page journey section."
      onSubmit={onSubmit}
      isLoading={isContentLoading}
      actions={<SaveButton status={status} />}
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
        resizable
        error={errors.intro?.paragraphPrimary?.message}
        {...register("intro.paragraphPrimary")}
      />
      <Textarea
        id="intro.paragraphSecondary"
        label="Paragraph Secondary"
        resizable
        error={errors.intro?.paragraphSecondary?.message}
        {...register("intro.paragraphSecondary")}
      />

      <Input
        id="intro.ctaLabel"
        label="Button Label"
        containerClassName="md:col-span-2"
        error={errors.intro?.ctaLabel?.message}
        {...register("intro.ctaLabel")}
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
                onClick={() => confirmRemoveStep(index)}
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

        <Container className="grid grid-cols-1 gap-4 min-[1400px]:grid-cols-2">
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
                  onClick={() => confirmRemoveTool(index)}
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
                      folder="journey"
                      error={errors.toolkit?.tools?.[index]?.icon?.message}
                      containerClassName="w-full md:max-w-[220px] md:shrink-0"
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
              certificatesArray.append({
                title: "",
                image: null,
                width: "500",
                height: "366",
                isLinkable: true,
                link: "",
              })
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
                onClick={() => confirmRemoveCertificate(index)}
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
                    folder="journey"
                    error={errors.toolkit?.certificates?.[index]?.image?.message}
                    containerClassName="w-full md:max-w-[220px] md:shrink-0"
                  />
                )}
              />

              <Container className="flex w-full flex-col gap-4">
                <Container className="flex justify-end">
                  <Controller
                    control={control}
                    name={`toolkit.certificates.${index}.isLinkable`}
                    render={({ field: linkableField }) => (
                      <Switch
                        id={`toolkit.certificates.${index}.isLinkable`}
                        label="Linkable"
                        checked={linkableField.value}
                        onChange={linkableField.onChange}
                      />
                    )}
                  />
                </Container>

                <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    id={`toolkit.certificates.${index}.title`}
                    label="Title"
                    containerClassName={clsx(!watch(`toolkit.certificates.${index}.isLinkable`) && "md:col-span-2")}
                    error={errors.toolkit?.certificates?.[index]?.title?.message}
                    {...register(`toolkit.certificates.${index}.title`)}
                  />

                  {watch(`toolkit.certificates.${index}.isLinkable`) && (
                    <Input
                      id={`toolkit.certificates.${index}.link`}
                      label="Link"
                      error={errors.toolkit?.certificates?.[index]?.link?.message}
                      {...register(`toolkit.certificates.${index}.link`)}
                    />
                  )}
                </Container>

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

      <ConfirmDialog {...confirmDialog} />
    </FormContainer>
  );
}

"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import Switch from "@/designUI/elements/formElement/Switch/Switch";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import { useStoryForm } from "./function";

export default function StoryForm() {
  const { form, onSubmit, clientLogosArray, processStepsArray, statsArray } = useStoryForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Story Section"
      description="Content shown in the landing page story section."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Input id="title" label="Title" error={errors.title?.message} {...register("title")} />
      <Input
        id="clientLogosHeading"
        label="Client Logos Heading"
        error={errors.clientLogosHeading?.message}
        {...register("clientLogosHeading")}
      />

      <Textarea
        id="description"
        label="Description"
        containerClassName="md:col-span-2"
        error={errors.description?.message}
        {...register("description")}
      />

      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Client Logos</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => clientLogosArray.append({ src: null, alt: "", height: "32" })}
          >
            + Add Logo
          </Button>
        </Container>

        {clientLogosArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="flex flex-col gap-4 rounded-[12px] border border-[#E4E4E4] p-4"
          >
            <Container className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">
                Logo {index + 1}
              </span>
              <button
                type="button"
                onClick={() => clientLogosArray.remove(index)}
                aria-label="Remove client logo"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8]"
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
            </Container>

            <Container className="flex flex-col gap-4 md:flex-row md:items-end">
              <Controller
                control={control}
                name={`clientLogos.${index}.src`}
                render={({ field: srcField }) => (
                  <FileInput
                    label="Logo"
                    value={srcField.value}
                    onChange={srcField.onChange}
                    error={errors.clientLogos?.[index]?.src?.message}
                    containerClassName="w-full md:max-w-[220px] md:shrink-0"
                  />
                )}
              />

              <Container className="flex w-full flex-col gap-4">
                <Input
                  id={`clientLogos.${index}.alt`}
                  label="Alt Text"
                  error={errors.clientLogos?.[index]?.alt?.message}
                  {...register(`clientLogos.${index}.alt`)}
                />
                <Input
                  id={`clientLogos.${index}.height`}
                  type="number"
                  label="Height (px)"
                  error={errors.clientLogos?.[index]?.height?.message}
                  {...register(`clientLogos.${index}.height`)}
                />
              </Container>
            </Container>
          </Container>
        ))}
      </Container>

      <Container className="mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Process Steps</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => processStepsArray.append({ label: "", image: null, icon: false })}
          >
            + Add Step
          </Button>
        </Container>

        {processStepsArray.fields.map((field, index) => (
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
                onClick={() => processStepsArray.remove(index)}
                aria-label="Remove process step"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8]"
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
            </Container>

            <Input
              id={`processSteps.${index}.label`}
              label="Label"
              error={errors.processSteps?.[index]?.label?.message}
              {...register(`processSteps.${index}.label`)}
            />

            {index === 1 && (
              <Container className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name={`processSteps.${index}.icon`}
                  render={({ field: iconField }) => (
                    <Switch
                      id={`processSteps.${index}.icon`}
                      label="Show Icon"
                      checked={iconField.value}
                      onChange={iconField.onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`processSteps.${index}.image`}
                  render={({ field: imageField }) => (
                    <FileInput
                      label="Image"
                      value={imageField.value}
                      onChange={imageField.onChange}
                      error={errors.processSteps?.[index]?.image?.message}
                      containerClassName="w-full md:max-w-[220px]"
                    />
                  )}
                />
              </Container>
            )}
          </Container>
        ))}
      </Container>

      <Container className="mt-3 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8">
        <Controller
          control={control}
          name="statsImageUrl"
          render={({ field }) => (
            <FileInput
              label="Stats Image"
              value={field.value}
              onChange={field.onChange}
              error={errors.statsImageUrl?.message}
              containerClassName="w-full md:max-w-[280px]"
            />
          )}
        />
      </Container>

      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Stats</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => statsArray.append({ value: "", label: "", description: "" })}
          >
            + Add Stat
          </Button>
        </Container>

        {statsArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="flex flex-col gap-4 rounded-[12px] border border-[#E4E4E4] p-4"
          >
            <Container className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">
                Stat {index + 1}
              </span>
              <button
                type="button"
                onClick={() => statsArray.remove(index)}
                aria-label="Remove stat"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8]"
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
            </Container>

            <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                id={`stats.${index}.value`}
                label="Value"
                error={errors.stats?.[index]?.value?.message}
                {...register(`stats.${index}.value`)}
              />
              <Input
                id={`stats.${index}.label`}
                label="Label"
                error={errors.stats?.[index]?.label?.message}
                {...register(`stats.${index}.label`)}
              />
            </Container>

            <Textarea
              id={`stats.${index}.description`}
              label="Description"
              error={errors.stats?.[index]?.description?.message}
              {...register(`stats.${index}.description`)}
            />
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}

"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import { useCaseStudyForm } from "./function";

const removeButtonClassName =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8]";

export default function CaseStudyForm() {
  const { form, onSubmit, slidesArray } = useCaseStudyForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Case Study Section"
      description="Content shown in the landing page case study slider."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Slides</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() =>
              slidesArray.append({
                publishedLabel: "Published Date:",
                publishedDate: "",
                title: "",
                description: "",
                ctaLabel: "View Case Study",
                ctaLink: "",
                studyImage: null,
              })
            }
          >
            + Add Slide
          </Button>
        </Container>

        {slidesArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="flex flex-col gap-4 rounded-[12px] border border-[#E4E4E4] p-4"
          >
            <Container className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">
                Slide {index + 1}
              </span>
              <button
                type="button"
                onClick={() => slidesArray.remove(index)}
                aria-label="Remove slide"
                className={removeButtonClassName}
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
            </Container>

            <Controller
              control={control}
              name={`slides.${index}.studyImage`}
              render={({ field: imageField }) => (
                <FileInput
                  label="Study Image"
                  value={imageField.value}
                  onChange={imageField.onChange}
                  error={errors.slides?.[index]?.studyImage?.message}
                  containerClassName="w-full md:max-w-[280px]"
                />
              )}
            />

            <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                id={`slides.${index}.publishedLabel`}
                label="Published Label"
                error={errors.slides?.[index]?.publishedLabel?.message}
                {...register(`slides.${index}.publishedLabel`)}
              />
              <Input
                id={`slides.${index}.publishedDate`}
                label="Published Date"
                error={errors.slides?.[index]?.publishedDate?.message}
                {...register(`slides.${index}.publishedDate`)}
              />
            </Container>

            <Input
              id={`slides.${index}.title`}
              label="Title"
              error={errors.slides?.[index]?.title?.message}
              {...register(`slides.${index}.title`)}
            />

            <Textarea
              id={`slides.${index}.description`}
              label="Description"
              error={errors.slides?.[index]?.description?.message}
              {...register(`slides.${index}.description`)}
            />

            <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                id={`slides.${index}.ctaLabel`}
                label="Button Label"
                error={errors.slides?.[index]?.ctaLabel?.message}
                {...register(`slides.${index}.ctaLabel`)}
              />
              <Input
                id={`slides.${index}.ctaLink`}
                label="Button Link"
                error={errors.slides?.[index]?.ctaLink?.message}
                {...register(`slides.${index}.ctaLink`)}
              />
            </Container>
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}

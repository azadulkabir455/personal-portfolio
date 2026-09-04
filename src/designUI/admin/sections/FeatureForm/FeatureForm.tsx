"use client";

import Input from "@/designUI/elements/formElement/Input/Input";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import { useFeatureForm } from "./function";

export default function FeatureForm() {
  const { form, onSubmit, linksArray } = useFeatureForm();
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Feature Section"
      description="Quick navigation links shown in the landing page feature section."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Links</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => linksArray.append({ label: "", href: "" })}
          >
            + Add Link
          </Button>
        </Container>

        {linksArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <Input
              id={`links.${index}.label`}
              label="Label"
              error={errors.links?.[index]?.label?.message}
              {...register(`links.${index}.label`)}
            />
            <Input
              id={`links.${index}.href`}
              label="Link"
              error={errors.links?.[index]?.href?.message}
              {...register(`links.${index}.href`)}
            />
            <button
              type="button"
              onClick={() => linksArray.remove(index)}
              aria-label="Remove link"
              className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8] lg:h-[52px] lg:w-[52px]"
            >
              <Icon name="FaTrashAlt" width={14} height={14} />
            </button>
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}

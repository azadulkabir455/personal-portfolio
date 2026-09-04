"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Switch from "@/designUI/elements/formElement/Switch/Switch";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import { useHeaderForm } from "./function";

export default function HeaderForm() {
  const { form, onSubmit, navLinksArray } = useHeaderForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Header Section"
      description="Content shown in the site-wide top navigation bar."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Input
        id="experienceLabel"
        label="Experience Label"
        containerClassName="md:col-span-2"
        error={errors.experienceLabel?.message}
        {...register("experienceLabel")}
      />

      <Input
        id="talkLabel"
        label="Talk Button Label"
        error={errors.talkLabel?.message}
        {...register("talkLabel")}
      />
      <Input
        id="resumeLabel"
        label="Resume Button Label"
        error={errors.resumeLabel?.message}
        {...register("resumeLabel")}
      />

      <Container className="mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8">
        <span className="font-sans text-[13px] font-semibold text-[#171717]">Nav Links</span>

        {navLinksArray.fields.map((field, index) => (
          <Container
            key={field.id}
            className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <Input
              id={`navLinks.${index}.label`}
              label="Label"
              error={errors.navLinks?.[index]?.label?.message}
              {...register(`navLinks.${index}.label`)}
            />
            <Input
              id={`navLinks.${index}.href`}
              label="Link"
              disabled
              error={errors.navLinks?.[index]?.href?.message}
              {...register(`navLinks.${index}.href`)}
            />
            <Controller
              control={control}
              name={`navLinks.${index}.enabled`}
              render={({ field: enabledField }) => (
                <Container className="flex h-[44px] items-center justify-center lg:h-[52px]">
                  <Switch
                    id={`navLinks.${index}.enabled`}
                    checked={enabledField.value}
                    onChange={enabledField.onChange}
                  />
                </Container>
              )}
            />
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}

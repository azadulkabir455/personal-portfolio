"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import IconSelect from "@/designUI/elements/formElement/IconSelect/IconSelect";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import Icon from "@/designUI/elements/Icon/Icon";
import type { IconName } from "@/designUI/elements/Icon/types";
import { useHeroForm } from "./function";

export default function HeroForm() {
  const { form, onSubmit, socialLinksArray } = useHeroForm();
  const { register, control, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = socialLinksArray;

  return (
    <FormContainer
      title="Hero Section"
      description="Content shown in the landing page hero banner."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Controller
        control={control}
        name="photo"
        render={({ field }) => (
          <FileInput
            label="Photo"
            value={field.value}
            onChange={field.onChange}
            error={errors.photo?.message}
            containerClassName="w-full md:max-w-[280px] md:col-span-2"
          />
        )}
      />

      <Input id="title" label="Title" error={errors.title?.message} {...register("title")} />
      <Input
        id="titleExtend"
        label="Title Extend"
        error={errors.titleExtend?.message}
        {...register("titleExtend")}
      />

      <Textarea
        id="greeting"
        label="Greeting"
        containerClassName="md:col-span-2"
        error={errors.greeting?.message}
        {...register("greeting")}
      />
      <Textarea
        id="description"
        label="Description"
        containerClassName="md:col-span-2"
        error={errors.description?.message}
        {...register("description")}
      />

      <Input id="ctaLabel" label="Button Label" error={errors.ctaLabel?.message} {...register("ctaLabel")} />
      <Input id="ctaLink" label="Button Link" error={errors.ctaLink?.message} {...register("ctaLink")} />

      <Container className="flex flex-col gap-4 md:col-span-2">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[13px] font-semibold text-[#171717]">Social Links</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => append({ icon: "", url: "" })}
          >
            + Add Link
          </Button>
        </Container>

        {fields.map((field, index) => (
          <Container
            key={field.id}
            className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[1fr_2fr_auto]"
          >
            <Controller
              control={control}
              name={`socialLinks.${index}.icon`}
              render={({ field: iconField }) => (
                <IconSelect
                  id={`socialLinks.${index}.icon`}
                  label="Icon"
                  value={iconField.value as IconName}
                  onChange={iconField.onChange}
                  error={errors.socialLinks?.[index]?.icon?.message}
                  containerClassName="col-start-1 row-start-1"
                />
              )}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label="Remove social link"
              className="col-start-2 row-start-1 flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8] md:col-start-3"
            >
              <Icon name="FaTrashAlt" width={16} height={16} />
            </button>
            <Input
              id={`socialLinks.${index}.url`}
              label="URL"
              error={errors.socialLinks?.[index]?.url?.message}
              containerClassName="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
              {...register(`socialLinks.${index}.url`)}
            />
          </Container>
        ))}
      </Container>
    </FormContainer>
  );
}

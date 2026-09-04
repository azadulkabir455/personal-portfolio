"use client";

import clsx from "clsx";
import { Controller, useFieldArray } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import Container from "@/designUI/elements/Container/Container";
import Button from "@/designUI/elements/Button/Button";
import Icon from "@/designUI/elements/Icon/Icon";
import type { RecentDesignGroupCardProps } from "../types";

const removeButtonClassName =
  "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8]";

export default function RecentDesignGroupCard({
  control,
  register,
  errors,
  index,
  onRemove,
}: RecentDesignGroupCardProps) {
  const imagesArray = useFieldArray({ control, name: `groups.${index}.images` });

  return (
    <Container className="flex flex-col gap-4 rounded-[12px] border border-[#E4E4E4] p-4">
      <Container className="flex items-center justify-between">
        <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">
          Group {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove group"
          className={removeButtonClassName}
        >
          <Icon name="FaTrashAlt" width={14} height={14} />
        </button>
      </Container>

      <Input
        id={`groups.${index}.href`}
        label="Link"
        error={errors.groups?.[index]?.href?.message}
        {...register(`groups.${index}.href`)}
      />

      <Container className="flex flex-col gap-4">
        <Container className="flex items-center justify-between">
          <span className="font-sans text-[12px] font-semibold text-[#8A8A86]">Images</span>
          <Button
            type="button"
            variant="plain"
            className="text-[#171717]"
            onClick={() => imagesArray.append({ src: null, alt: "" })}
          >
            + Add Image
          </Button>
        </Container>

        <Container className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {imagesArray.fields.map((imageField, imageIndex) => (
            <Container
              key={imageField.id}
              className="flex flex-col items-start gap-4 md:flex-row md:items-end"
            >
              <Controller
                control={control}
                name={`groups.${index}.images.${imageIndex}.src`}
                render={({ field: srcField }) => (
                  <FileInput
                    label="Image"
                    value={srcField.value}
                    onChange={srcField.onChange}
                    error={errors.groups?.[index]?.images?.[imageIndex]?.src?.message}
                    containerClassName="w-full max-w-[220px] md:shrink-0"
                  />
                )}
              />

              <Container className="flex w-full items-end gap-4">
                <Input
                  id={`groups.${index}.images.${imageIndex}.alt`}
                  label="Alt Text"
                  containerClassName="w-full"
                  error={errors.groups?.[index]?.images?.[imageIndex]?.alt?.message}
                  {...register(`groups.${index}.images.${imageIndex}.alt`)}
                />
                <button
                  type="button"
                  onClick={() => imagesArray.remove(imageIndex)}
                  aria-label="Remove image"
                  className={clsx(removeButtonClassName, "mb-[18px] lg:mb-5")}
                >
                  <Icon name="FaTrashAlt" width={14} height={14} />
                </button>
              </Container>
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
}

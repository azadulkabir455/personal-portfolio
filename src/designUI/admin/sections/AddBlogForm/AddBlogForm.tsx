"use client";

import { Controller } from "react-hook-form";
import Input from "@/designUI/elements/formElement/Input/Input";
import Textarea from "@/designUI/elements/formElement/Textarea/Textarea";
import FileInput from "@/designUI/elements/formElement/FileInput/FileInput";
import Select from "@/designUI/elements/formElement/Select/Select";
import TagInput from "@/designUI/elements/formElement/TagInput/TagInput";
import RichTextEditor from "@/designUI/elements/formElement/RichTextEditor/RichTextEditor";
import FormContainer from "@/designUI/elements/FormContainer/FormContainer";
import Button from "@/designUI/elements/Button/Button";
import { useAddBlogForm } from "./function";
import type { AddBlogFormProps } from "./types";

export default function AddBlogForm({ heading = "Add Blog", defaultValues }: AddBlogFormProps) {
  const { form, onSubmit, categoryOptions, tagSuggestions } = useAddBlogForm(defaultValues);
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title={heading}
      description="Write and publish a new blog post."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Blog</Button>}
    >
      <Controller
        control={control}
        name="image"
        render={({ field }) => (
          <FileInput
            label="Cover Image"
            value={field.value}
            onChange={field.onChange}
            error={errors.image?.message}
            containerClassName="w-full md:max-w-[280px] md:col-span-2"
          />
        )}
      />

      <Input
        id="title"
        label="Title"
        containerClassName="md:col-span-2"
        error={errors.title?.message}
        {...register("title")}
      />

      <Textarea
        id="subtitle"
        label="Subtitle"
        containerClassName="md:col-span-2"
        error={errors.subtitle?.message}
        {...register("subtitle")}
      />

      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select
            id="category"
            label="Category"
            value={field.value}
            onChange={field.onChange}
            options={categoryOptions}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <TagInput
            id="tags"
            label="Tags"
            value={field.value}
            onChange={field.onChange}
            suggestions={tagSuggestions}
            error={errors.tags?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <RichTextEditor
            id="content"
            label="Content"
            value={field.value}
            onChange={field.onChange}
            error={errors.content?.message}
            containerClassName="md:col-span-2"
          />
        )}
      />
    </FormContainer>
  );
}

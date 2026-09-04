"use client";

import clsx from "clsx";
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
import { useFooterForm } from "./function";

const dividerClassName =
  "mt-3 flex flex-col gap-4 border-t border-[#E4E4E4] pt-6 md:col-span-2 md:mt-4 md:pt-8";

const removeButtonClassName =
  "flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#FDEBEB] text-[#E5484D] transition-colors duration-200 hover:bg-[#FBD8D8] lg:h-[52px] lg:w-[52px]";

export default function FooterForm() {
  const { form, onSubmit, socialLinksArray, legalLinksArray } = useFooterForm();
  const { register, control, formState } = form;
  const { errors } = formState;

  return (
    <FormContainer
      title="Footer Section"
      description="Content shown in the site-wide footer."
      onSubmit={onSubmit}
      actions={<Button type="submit">Save Changes</Button>}
    >
      <Controller
        control={control}
        name="profile.image"
        render={({ field }) => (
          <FileInput
            label="Profile Photo"
            value={field.value}
            onChange={field.onChange}
            error={errors.profile?.image?.message}
            containerClassName="w-full md:max-w-[280px] md:col-span-2"
          />
        )}
      />

      <Input
        id="profile.name"
        label="Name"
        error={errors.profile?.name?.message}
        {...register("profile.name")}
      />
      <Input
        id="profile.email"
        label="Email"
        error={errors.profile?.email?.message}
        {...register("profile.email")}
      />

      <Textarea
        id="profile.tagline"
        label="Tagline"
        containerClassName="md:col-span-2"
        error={errors.profile?.tagline?.message}
        {...register("profile.tagline")}
      />

      <Input
        id="profile.availabilityLabel"
        label="Availability Label"
        error={errors.profile?.availabilityLabel?.message}
        {...register("profile.availabilityLabel")}
      />
      <Input
        id="profile.availability"
        label="Availability (comma separated)"
        error={errors.profile?.availability?.message}
        {...register("profile.availability")}
      />

      <Input
        id="profile.resumeLabel"
        label="Resume Button Label"
        error={errors.profile?.resumeLabel?.message}
        {...register("profile.resumeLabel")}
      />
      <Input
        id="profile.ctaLabel"
        label="CTA Button Label"
        error={errors.profile?.ctaLabel?.message}
        {...register("profile.ctaLabel")}
      />

      <Textarea
        id="profile.contactPrompt"
        label="Contact Prompt"
        containerClassName="md:col-span-2"
        error={errors.profile?.contactPrompt?.message}
        {...register("profile.contactPrompt")}
      />

      <Container className={dividerClassName}>
        <Input
          id="social.heading"
          label="Social Heading"
          error={errors.social?.heading?.message}
          {...register("social.heading")}
        />
        <Textarea
          id="social.description"
          label="Social Description"
          error={errors.social?.description?.message}
          {...register("social.description")}
        />
        <Input
          id="social.findMeLabel"
          label="Find Me Label"
          error={errors.social?.findMeLabel?.message}
          {...register("social.findMeLabel")}
        />

        <Container className="flex flex-col gap-4">
          <Container className="flex items-center justify-between">
            <span className="font-sans text-[13px] font-semibold text-[#171717]">
              Social Links
            </span>
            <Button
              type="button"
              variant="plain"
              className="text-[#171717]"
              onClick={() => socialLinksArray.append({ icon: "", href: "" })}
            >
              + Add Link
            </Button>
          </Container>

          {socialLinksArray.fields.map((field, index) => (
            <Container
              key={field.id}
              className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[1fr_2fr_auto]"
            >
              <Controller
                control={control}
                name={`social.links.${index}.icon`}
                render={({ field: iconField }) => (
                  <IconSelect
                    id={`social.links.${index}.icon`}
                    label="Icon"
                    value={iconField.value as IconName}
                    onChange={iconField.onChange}
                    error={errors.social?.links?.[index]?.icon?.message}
                    containerClassName="col-start-1 row-start-1"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => socialLinksArray.remove(index)}
                aria-label="Remove social link"
                className={clsx(removeButtonClassName, "col-start-2 row-start-1 md:col-start-3")}
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
              <Input
                id={`social.links.${index}.href`}
                label="Link"
                containerClassName="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
                error={errors.social?.links?.[index]?.href?.message}
                {...register(`social.links.${index}.href`)}
              />
            </Container>
          ))}
        </Container>
      </Container>

      <Container className={dividerClassName}>
        <Container className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="legal.copyrightName"
            label="Name"
            error={errors.legal?.copyrightName?.message}
            {...register("legal.copyrightName")}
          />
          <Input
            id="legal.copyrightNameHref"
            label="Name Link"
            error={errors.legal?.copyrightNameHref?.message}
            {...register("legal.copyrightNameHref")}
          />
        </Container>

        <Container className="flex flex-col gap-4">
          <Container className="flex items-center justify-between">
            <span className="font-sans text-[13px] font-semibold text-[#171717]">
              Legal Links
            </span>
            <Button
              type="button"
              variant="plain"
              className="text-[#171717]"
              onClick={() => legalLinksArray.append({ label: "", href: "" })}
            >
              + Add Link
            </Button>
          </Container>

          {legalLinksArray.fields.map((field, index) => (
            <Container
              key={field.id}
              className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <Input
                id={`legal.links.${index}.label`}
                label="Label"
                containerClassName="col-start-1 row-start-1"
                error={errors.legal?.links?.[index]?.label?.message}
                {...register(`legal.links.${index}.label`)}
              />
              <button
                type="button"
                onClick={() => legalLinksArray.remove(index)}
                aria-label="Remove legal link"
                className={clsx(removeButtonClassName, "col-start-2 row-start-1 md:col-start-3")}
              >
                <Icon name="FaTrashAlt" width={14} height={14} />
              </button>
              <Input
                id={`legal.links.${index}.href`}
                label="Link"
                containerClassName="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
                error={errors.legal?.links?.[index]?.href?.message}
                {...register(`legal.links.${index}.href`)}
              />
            </Container>
          ))}
        </Container>

        <Input
          id="legal.developedByLabel"
          label="Developed By Label"
          error={errors.legal?.developedByLabel?.message}
          {...register("legal.developedByLabel")}
        />
        <Input
          id="legal.developedByName"
          label="Developed By Name"
          error={errors.legal?.developedByName?.message}
          {...register("legal.developedByName")}
        />
        <Input
          id="legal.developedByHref"
          label="Developed By Link"
          error={errors.legal?.developedByHref?.message}
          {...register("legal.developedByHref")}
        />
      </Container>
    </FormContainer>
  );
}

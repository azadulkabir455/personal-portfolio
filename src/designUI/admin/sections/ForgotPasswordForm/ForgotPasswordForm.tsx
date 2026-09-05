"use client";

import Link from "@/designUI/elements/Link/Link";
import Input from "@/designUI/elements/formElement/Input/Input";
import Button from "@/designUI/elements/Button/Button";
import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import { useForgotPasswordForm } from "./function";

export default function ForgotPasswordForm() {
  const { form, onSubmit, successMessage, errorMessage } = useForgotPasswordForm();
  const { register, formState } = form;
  const { errors, isSubmitting } = formState;

  return (
    <Container className="w-full rounded-[24px] border border-[#E4E4E4] bg-white p-6 shadow-[0_20px_60px_-15px_rgba(0,92,214,0.15)] lg:w-[550px] lg:p-10">
      <Container className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-gradient-to-b from-[#64A6FF] to-[#005CD6]">
        <Icon name="FaEnvelope" width={16} height={16} color="#F7F7F7" />
      </Container>

      <Text variant="h1" className="mt-5 font-sans text-[24px] font-semibold text-[#171717] lg:text-[28px]">
        Forgot Password
      </Text>
      <Text className="mt-1.5 font-sans text-[13px] text-[#8A8A86] lg:text-[14px]">
        Enter your email to receive a password reset link.
      </Text>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
        <Input id="email" type="email" label="Email" error={errors.email?.message} {...register("email")} />

        {successMessage && (
          <Text className="font-sans text-[12px] font-medium text-[#2F9E44] lg:text-[13px]">
            {successMessage}
          </Text>
        )}
        <FieldError message={errorMessage} />

        <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>

        <Link
          href="/login"
          className="self-center font-sans text-[12px] font-medium text-[#388EFF] transition-colors duration-200 hover:text-[#005CD6] lg:text-[13px]"
        >
          Back to Login
        </Link>
      </form>
    </Container>
  );
}

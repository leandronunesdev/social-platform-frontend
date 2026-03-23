"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetFormData, passwordResetSchema } from "./schema";
import { useState } from "react";
import { passwordReset } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import Message from "@/components/message";
import { encodeParam } from "@/utils";

export default function PasswordResetPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await passwordReset(data);
      router.push(
        `/password-reset/validate-code?email=${encodeParam(data.email)}`
      );
    } catch (error) {
      if (error instanceof ApiClientError) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPage>
      <form onSubmit={handleSubmit(onSubmit)}>
        {apiError && <Message message={apiError} type={"error"} />}
        <Input
          label="email"
          type="email"
          id="email"
          placeholder="user@socialmedia.com"
          register={register}
          error={errors.email}
          disabled={isLoading}
        />
        <Button
          type="submit"
          label={isLoading ? "sending..." : "continue"}
          disabled={isLoading}
          className="mb-3"
        />
        <Button
          type="button"
          label={"back"}
          disabled={isLoading}
          variant="secondary"
          onClick={() => router.back()}
        />
      </form>
    </AuthPage>
  );
}

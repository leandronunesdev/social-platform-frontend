"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { setNewPassword } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import Message from "@/components/message";
import { NewPasswordData, newPasswordSchema } from "./schema";

export default function NewPasswordPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const message = apiError;
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      if (!email || !code) {
        setApiError(
          `${!email ? "Email" : "Validation code"} is missing. Please restart password reset.`
        );
        return;
      }

      await setNewPassword({
        email: email,
        code: code,
        newPassword: data.newPassword,
      });
      router.push(`/login?from=passwordReset`);
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
        {message && (
          <Message message={message} type={!!apiError ? "error" : "info"} />
        )}
        <Input
          label="new password"
          id="newPassword"
          placeholder="**********"
          register={register}
          error={errors.newPassword}
          type="password"
          disabled={isLoading}
        />
        <Input
          label="repeat password"
          id="confirmPassword"
          placeholder="**********"
          register={register}
          error={errors.confirmPassword}
          type="password"
          disabled={isLoading}
        />
        <Button
          type="submit"
          label={isLoading ? "sending..." : "continue"}
          disabled={isLoading}
        />
        <Button
          label={"cancel"}
          disabled={isLoading}
          variant="secondary"
          onClick={() => router.push("/login")}
        />
      </form>
    </AuthPage>
  );
}

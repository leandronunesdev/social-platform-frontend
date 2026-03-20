"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { passwordReset, validateCode } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import Message from "@/components/message";
import { ValidateCodeData, validateCodeSchema } from "./schema";
import AuthLink from "@/components/auth-link";
import { encodeParam } from "@/utils";

export default function ValidateCodePage() {
  const router = useRouter();
  const RESEND_SECONDS = 60;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);

  const initialMessage =
    "Code sent to your email address.\nPlease, check your inbox or spam folder.";

  const message = apiError || initialMessage;
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const resendText = countdown
    ? `Didn't receive? Resend in ${countdown}s`
    : `Didn't receive?`;

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateCodeData>({
    resolver: zodResolver(validateCodeSchema),
  });

  const onSubmit = async (data: ValidateCodeData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      if (!email) {
        setApiError("Email is missing. Please restart password reset.");
        return;
      }

      await validateCode({ code: data.code, email });
      router.push(
        `/password-reset/new-password?email=${encodeParam(email)}&code=${encodeParam(data.code)}`
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

  const resendCode = async (email: string | null) => {
    if (!email) {
      setApiError("An error occured.");
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      await passwordReset({ email });
      setCountdown(RESEND_SECONDS);
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
          label="6-digit code"
          id="code"
          placeholder="-- -- --"
          register={register}
          error={errors.code}
          maxLength={6}
        />
        <Button
          type="submit"
          label={isLoading ? "sending..." : "continue"}
          disabled={isLoading}
        />
        <Button
          label={"back"}
          disabled={isLoading}
          variant="secondary"
          onClick={() => router.back()}
        />
        <AuthLink
          text={resendText}
          linkText={countdown ? "" : "Resend"}
          onClick={() => resendCode(email)}
        />
      </form>
    </AuthPage>
  );
}

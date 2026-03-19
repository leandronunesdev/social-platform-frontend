"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import AuthLink from "@/components/auth-link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "./schema";
import { useState } from "react";
import { login } from "@/lib/api/auth";
import { saveToken } from "@/lib/auth/token";
import { useRouter } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import Message from "@/components/message";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await login(data);
      saveToken(response.token);
      router.push("/home");
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
        {apiError && <Message message={apiError} />}

        <Input
          label="email"
          type="email"
          id="email"
          placeholder="user@socialmedia.com"
          register={register}
          error={errors.email}
        />

        <Input
          label="password"
          type="password"
          id="password"
          placeholder="*********"
          className="pb-2"
          register={register}
          error={errors.password}
        />

        <AuthLink
          text={""}
          linkText="Forgot your password?"
          href="/password-reset"
          className="flex justify-end pb-5"
        />

        <Button
          type="submit"
          label={isLoading ? "signing in" : "sign in"}
          className="mb-8"
          disabled={isLoading}
        />

        <AuthLink
          text={"Don't have an account?"}
          linkText="Sign up"
          href="/register"
        />
      </form>
    </AuthPage>
  );
}

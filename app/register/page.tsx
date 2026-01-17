"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import AuthLink from "@/components/auth-link";
import { registerSchema, type RegisterFormData } from "@/app/register/register";
import { registerAccount } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import { saveToken } from "@/lib/auth/token";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await registerAccount(data);
      // Save JWT token to localStorage
      saveToken(response.token);
      router.push("/profile/setup");
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
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{apiError}</p>
          </div>
        )}

        <Input
          label="name"
          type="text"
          id="name"
          placeholder="John Doe"
          register={register}
          error={errors.name}
        />

        <Input
          label="username"
          type="text"
          id="username"
          placeholder="john.doe"
          register={register}
          error={errors.username}
        />

        <Input
          label="email"
          type="email"
          id="email"
          placeholder="john.doe@email.com"
          register={register}
          error={errors.email}
        />

        <Input
          label="password"
          type="password"
          id="password"
          placeholder="**********"
          register={register}
          error={errors.password}
        />

        <Input
          label="confirm password"
          type="password"
          id="confirmPassword"
          placeholder="**********"
          paddingBottom="pb-12"
          register={register}
          error={errors.confirmPassword}
        />

        <Button
          type="submit"
          label={isLoading ? "Signing up..." : "sign up"}
          marginBottom="mb-8"
          disabled={isLoading}
        />

        <AuthLink
          text={"Already have an account?"}
          linkText="Sign in"
          href="/login"
        />
      </form>
    </AuthPage>
  );
}

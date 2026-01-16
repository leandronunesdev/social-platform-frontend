"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import AuthLink from "@/components/auth-link";
import { registerSchema, type RegisterFormData } from "@/app/register/register";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Form data:", data);
    // TODO: Implement API call to POST /registerAccount
  };

  return (
    <AuthPage>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button type="submit" label="sign up" marginBottom="mb-8" />

        <AuthLink
          text={"Already have an account?"}
          linkText="Sign in"
          href="/login"
        />
      </form>
    </AuthPage>
  );
}

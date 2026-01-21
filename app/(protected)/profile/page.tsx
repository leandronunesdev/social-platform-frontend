"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import Button from "@/components/button";
import AuthPage from "@/components/auth-page";
import { registerAccount, updateProfile } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import { saveToken } from "@/lib/auth/token";
import TextArea from "@/components/textarea";
import { ProfileFormData, profileSchema } from "./schema";
import ErrorMessage from "@/components/error-message";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await updateProfile(data);
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
        {apiError && <ErrorMessage message={apiError} />}

        <p className="text-center pb-7">Complete your profile</p>

        <TextArea label="about you" id="bio" />

        <Input
          label="country"
          type="text"
          id="country"
          placeholder="Brazil"
          register={register}
          error={errors.country}
        />

        <Input
          label="state"
          type="text"
          id="state"
          placeholder="Paraná"
          register={register}
          error={errors.state}
        />

        <Input
          label="city"
          type="text"
          id="city"
          placeholder="Curitiba"
          register={register}
          error={errors.city}
        />

        <Input
          label="avatar url"
          type="text"
          id="avatar"
          placeholder="https://host.com/avatar.jpg"
          register={register}
          error={errors.avatarUrl}
          paddingBottom="pb-12"
        />

        <Button
          type="submit"
          label={isLoading ? "Submitting" : "continue"}
          disabled={isLoading}
        />
      </form>
    </AuthPage>
  );
}

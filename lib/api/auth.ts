import { ProfileFormData } from "@/app/(protected)/profile/schema";
import apiClient from "./client";
import type { RegisterFormData } from "@/app/(public)/register/schema";
import { LoginFormData } from "@/app/(public)/login/schema";

type RegisterAccountResponse = {
  token: string;
};

export async function registerAccount(
  data: RegisterFormData
): Promise<RegisterAccountResponse> {
  const { confirmPassword, ...accountData } = data;

  return apiClient<RegisterAccountResponse>("/auth/registerAccount", {
    method: "POST",
    body: accountData,
    requireAuth: false,
  });
}

type UpdateProfileResponse = {
  message: string;
};

export async function updateProfile(
  data: ProfileFormData
): Promise<UpdateProfileResponse> {
  return apiClient<UpdateProfileResponse>("/auth/updateProfile", {
    method: "PUT",
    body: data,
    requireAuth: true,
  });
}

type LoginResponse = {
  message: string;
  token: string;
};

export async function login(data: LoginFormData): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: data,
    requireAuth: false,
  });
}

import { ProfileFormData } from "@/app/(protected)/profile/schema";
import apiClient from "./client";
import type { RegisterFormData } from "@/app/(public)/register/schema";
import { LoginFormData } from "@/app/(public)/login/schema";
import { PasswordResetFormData } from "@/app/(public)/password-reset/schema";
import { ValidateCodeData } from "@/app/(public)/password-reset/validate-code/schema";

type BaseApiResponse = {
  message: string;
};

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

export async function updateProfile(
  data: ProfileFormData
): Promise<BaseApiResponse> {
  return apiClient<BaseApiResponse>("/auth/updateProfile", {
    method: "PUT",
    body: data,
    requireAuth: true,
  });
}

type LoginResponse = BaseApiResponse & {
  token: string;
};

export async function login(data: LoginFormData): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: data,
    requireAuth: false,
  });
}

export async function passwordReset(
  data: PasswordResetFormData
): Promise<BaseApiResponse> {
  return apiClient<BaseApiResponse>("/auth/passwordReset", {
    method: "POST",
    body: data,
    requireAuth: false,
  });
}

type ValidateCodeDataPayload = ValidateCodeData & {
  email: string;
};

export async function validateCode(
  data: ValidateCodeDataPayload
): Promise<BaseApiResponse> {
  return apiClient<BaseApiResponse>("/auth/validateCode", {
    method: "POST",
    body: data,
    requireAuth: false,
  });
}

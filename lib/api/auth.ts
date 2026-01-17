import apiClient from "./client";
import type { RegisterFormData } from "@/app/register/register";

type RegisterAccountResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
  creationDate: string;
  token: string; // JWT token returned from API
};

export async function registerAccount(
  data: RegisterFormData
): Promise<RegisterAccountResponse> {
  // Remove confirmPassword before sending to API
  const { confirmPassword, ...accountData } = data;

  return apiClient<RegisterAccountResponse>("/auth/registerAccount", {
    method: "POST",
    body: accountData,
    requireAuth: false, // Registration doesn't need auth
  });
}

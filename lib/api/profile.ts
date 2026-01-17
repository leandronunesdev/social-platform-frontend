import apiClient from "./client";

type UpdateProfileData = {
  bio?: string;
  country?: string;
  state?: string;
  city?: string;
  avatarUrl?: string;
};

type ProfileResponse = {
  id: string;
  userAccountId: string;
  bio: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  avatarUrl: string | null;
};

export async function updateProfile(
  data: UpdateProfileData
): Promise<ProfileResponse> {
  return apiClient<ProfileResponse>("/profile/updateProfile", {
    method: "PUT",
    body: data,
    requireAuth: true, // This will automatically attach the JWT token
  });
}

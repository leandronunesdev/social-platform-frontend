import { z } from "zod";

export const profileSchema = z.object({
  bio: z
    .string()
    .max(160, "Bio must be at maximum 160 characters")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .regex(/^[\p{L}\s]+$/u, "Country can only contain letters and spaces")
    .max(50, "Country must be at maximum 50 characters")
    .optional()
    .or(z.literal("")),
  state: z
    .string()
    .regex(/^[\p{L}\s]+$/u, "State can only contain letters and spaces")
    .max(50, "State must be at maximum 50 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .regex(/^[\p{L}\s]+$/u, "City can only contain letters and spaces")
    .max(50, "City must be at maximum 50 characters")
    .optional()
    .or(z.literal("")),
  avatarUrl: z
    .url({ message: "Avatar must be a valid URL" })
    .optional()
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

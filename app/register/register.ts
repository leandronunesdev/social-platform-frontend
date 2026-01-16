import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be at maximum 30 characters"),
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .regex(
        /^[a-z0-9._]+$/,
        "Username can only contain lowercase letters, numbers, dots, and underscores"
      )
      .max(20, "Username must be at maximum 20 characters"),
    email: z
      .email({ message: "Invalid email address" })
      .min(1, "Email is required")
      .max(64, "Email must be at maximum 64 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

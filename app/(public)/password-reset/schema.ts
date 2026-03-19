import z from "zod";

export const passwordResetSchema = z.object({
  email: z.string().min(1, "Email is required"),
});

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

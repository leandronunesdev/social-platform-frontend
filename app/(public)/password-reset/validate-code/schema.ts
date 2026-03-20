import z from "zod";

export const validateCodeSchema = z.object({
  code: z.string().min(6, "Inform 6-digit code sent to your email"),
});

export type ValidateCodeData = z.infer<typeof validateCodeSchema>;

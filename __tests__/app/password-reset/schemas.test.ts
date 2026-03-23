import { passwordResetSchema } from "@/app/(public)/password-reset/schema";
import { validateCodeSchema } from "@/app/(public)/password-reset/validate-code/schema";
import { newPasswordSchema } from "@/app/(public)/password-reset/new-password/schema";

describe("Password Reset Schemas", () => {
  describe("passwordResetSchema", () => {
    it("accepts a non-empty email value", () => {
      const result = passwordResetSchema.safeParse({ email: "john@example.com" });
      expect(result.success).toBe(true);
    });

    it("rejects empty email", () => {
      const result = passwordResetSchema.safeParse({ email: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("validateCodeSchema", () => {
    it("accepts 6-digit code", () => {
      const result = validateCodeSchema.safeParse({ code: "123456" });
      expect(result.success).toBe(true);
    });

    it("rejects code shorter than 6 digits", () => {
      const result = validateCodeSchema.safeParse({ code: "12345" });
      expect(result.success).toBe(false);
    });
  });

  describe("newPasswordSchema", () => {
    it("accepts valid password and matching confirm password", () => {
      const result = newPasswordSchema.safeParse({
        newPassword: "Password123",
        confirmPassword: "Password123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects when passwords do not match", () => {
      const result = newPasswordSchema.safeParse({
        newPassword: "Password123",
        confirmPassword: "Password321",
      });
      expect(result.success).toBe(false);
    });
  });
});

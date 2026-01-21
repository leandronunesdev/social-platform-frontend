/**
 * Example unit test for validation schemas
 *
 * This is a reference example. Implement your own tests following this pattern.
 */

import { registerSchema } from "@/app/(public)/register/schema";

describe("Register Schema Validation", () => {
  describe("Valid data", () => {
    it("should validate correct registration data", () => {
      const validData = {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid data", () => {
    it("should reject short username", () => {
      const invalidData = {
        name: "John Doe",
        username: "jo", // Too short
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain("username");
      }
    });

    it("should reject invalid email", () => {
      const invalidData = {
        name: "John Doe",
        username: "johndoe",
        email: "invalid-email", // Invalid format
        password: "password123",
        confirmPassword: "password123",
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject mismatched passwords", () => {
      const invalidData = {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "different123", // Mismatch
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    // TODO: Add more test cases for:
    // - Short password
    // - Invalid username format (special characters)
    // - Missing required fields
  });
});

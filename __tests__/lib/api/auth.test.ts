import apiClient from "@/lib/api/client";
import {
  passwordReset,
  setNewPassword,
  validateCode,
} from "@/lib/api/auth";

jest.mock("@/lib/api/client", () => jest.fn());

describe("auth API functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls passwordReset endpoint with expected payload", async () => {
    (apiClient as jest.Mock).mockResolvedValue({ message: "ok" });

    await passwordReset({ email: "john@example.com" });

    expect(apiClient).toHaveBeenCalledWith("/auth/passwordReset", {
      method: "POST",
      body: { email: "john@example.com" },
      requireAuth: false,
    });
  });

  it("calls validateCode endpoint with expected payload", async () => {
    (apiClient as jest.Mock).mockResolvedValue({ message: "ok" });

    await validateCode({ email: "john@example.com", code: "123456" });

    expect(apiClient).toHaveBeenCalledWith("/auth/validateCode", {
      method: "POST",
      body: { email: "john@example.com", code: "123456" },
      requireAuth: false,
    });
  });

  it("calls setNewPassword endpoint with expected payload", async () => {
    (apiClient as jest.Mock).mockResolvedValue({ message: "ok" });

    await setNewPassword({
      email: "john@example.com",
      code: "123456",
      newPassword: "Password123",
    });

    expect(apiClient).toHaveBeenCalledWith("/auth/setNewPassword", {
      method: "POST",
      body: {
        email: "john@example.com",
        code: "123456",
        newPassword: "Password123",
      },
      requireAuth: false,
    });
  });
});

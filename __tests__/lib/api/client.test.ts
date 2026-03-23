import apiClient, { ApiClientError } from "@/lib/api/client";
import { getToken, removeToken } from "@/lib/auth/token";

jest.mock("@/lib/auth/token", () => ({
  getToken: jest.fn(),
  removeToken: jest.fn(),
}));

describe("apiClient", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:4000";
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("throws ApiClientError with API message when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: async () => ({ message: "Invalid payload" }),
    } as Response);

    try {
      await apiClient("/auth/passwordReset", { method: "POST" });
      throw new Error("Expected apiClient to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiClientError);
      expect(error).toMatchObject({
        message: "Invalid payload",
        status: 400,
      });
    }
  });

  it("removes token and redirects on authenticated 401", async () => {
    (getToken as jest.Mock).mockReturnValue("token-123");
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: async () => ({ message: "Unauthorized" }),
    } as Response);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      apiClient("/auth/updateProfile", { method: "PUT", requireAuth: true })
    ).rejects.toBeInstanceOf(ApiClientError);

    expect(removeToken).toHaveBeenCalledTimes(1);
    consoleErrorSpy.mockRestore();
  });

  it("wraps unexpected exceptions in ApiClientError with status 0", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network down"));

    await expect(apiClient("/auth/passwordReset", { method: "POST" })).rejects.toMatchObject(
      {
        message: "Network down",
        status: 0,
      }
    );
  });
});

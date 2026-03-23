import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewPasswordPage from "./page";
import { setNewPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

const mockPush = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockUseSearchParams(),
}));

jest.mock("@/lib/api/auth", () => ({
  setNewPassword: jest.fn(),
}));

describe("NewPasswordPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("email=john@example.com&code=123456")
    );
  });

  it("sets a new password and navigates to login", async () => {
    (setNewPassword as jest.Mock).mockResolvedValue({ message: "ok" });

    render(<NewPasswordPage />);

    await userEvent.type(screen.getByLabelText("new password"), "Password123");
    await userEvent.type(
      screen.getByLabelText("repeat password"),
      "Password123"
    );
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    await waitFor(() => {
      expect(setNewPassword).toHaveBeenCalledWith({
        email: "john@example.com",
        code: "123456",
        newPassword: "Password123",
      });
      expect(mockPush).toHaveBeenCalledWith("/login?from=passwordReset");
    });
  });

  it("shows error when required query params are missing", async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("code=123456"));

    render(<NewPasswordPage />);

    await userEvent.type(screen.getByLabelText("new password"), "Password123");
    await userEvent.type(
      screen.getByLabelText("repeat password"),
      "Password123"
    );
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(
      await screen.findByText("Email is missing. Please restart password reset.")
    ).toBeInTheDocument();
  });

  it("shows API error when set password fails", async () => {
    (setNewPassword as jest.Mock).mockRejectedValue(
      new ApiClientError("Could not set password", 400)
    );

    render(<NewPasswordPage />);

    await userEvent.type(screen.getByLabelText("new password"), "Password123");
    await userEvent.type(
      screen.getByLabelText("repeat password"),
      "Password123"
    );
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(await screen.findByText("Could not set password")).toBeInTheDocument();
  });
});

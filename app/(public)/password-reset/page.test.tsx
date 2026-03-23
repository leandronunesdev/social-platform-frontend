import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordResetPage from "./page";
import { passwordReset } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

const mockPush = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

jest.mock("@/lib/api/auth", () => ({
  passwordReset: jest.fn(),
}));

describe("PasswordResetPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits email and navigates to validate-code page", async () => {
    (passwordReset as jest.Mock).mockResolvedValue({ message: "ok" });

    render(<PasswordResetPage />);

    await userEvent.type(screen.getByLabelText("email"), "john@example.com");
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    await waitFor(() => {
      expect(passwordReset).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(mockPush).toHaveBeenCalledWith(
        "/password-reset/validate-code?email=john%40example.com"
      );
    });
  });

  it("shows API error message when request fails", async () => {
    (passwordReset as jest.Mock).mockRejectedValue(
      new ApiClientError("Reset failed", 400)
    );

    render(<PasswordResetPage />);

    await userEvent.type(screen.getByLabelText("email"), "john@example.com");
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(await screen.findByText("Reset failed")).toBeInTheDocument();
  });
});

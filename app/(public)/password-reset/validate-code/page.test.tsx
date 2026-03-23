import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ValidateCodePage from "./page";
import { passwordReset, validateCode } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
  useSearchParams: () => mockUseSearchParams(),
}));

jest.mock("@/lib/api/auth", () => ({
  passwordReset: jest.fn(),
  validateCode: jest.fn(),
}));

describe("ValidateCodePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("email=john@example.com")
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("validates code and navigates to new-password page", async () => {
    (validateCode as jest.Mock).mockResolvedValue({ message: "ok" });

    render(<ValidateCodePage />);

    await userEvent.type(screen.getByLabelText("6-digit code"), "123456");
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    await waitFor(() => {
      expect(validateCode).toHaveBeenCalledWith({
        code: "123456",
        email: "john@example.com",
      });
      expect(mockPush).toHaveBeenCalledWith(
        "/password-reset/new-password?email=john%40example.com&code=123456"
      );
    });
  });

  it("shows message when email query param is missing", async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));

    render(<ValidateCodePage />);

    await userEvent.type(screen.getByLabelText("6-digit code"), "123456");
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(
      await screen.findByText("Email is missing. Please restart password reset.")
    ).toBeInTheDocument();
  });

  it("resends code when countdown reaches zero", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    (passwordReset as jest.Mock).mockResolvedValue({ message: "ok" });

    render(<ValidateCodePage />);

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    await user.click(await screen.findByRole("button", { name: "Resend" }));

    await waitFor(() => {
      expect(passwordReset).toHaveBeenCalledWith({ email: "john@example.com" });
    });
  });

  it("shows API error when validate code fails", async () => {
    (validateCode as jest.Mock).mockRejectedValue(
      new ApiClientError("Invalid code", 400)
    );

    render(<ValidateCodePage />);

    await userEvent.type(screen.getByLabelText("6-digit code"), "123456");
    await userEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(await screen.findByText("Invalid code")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthPage from ".";

describe("AuthPage Component", () => {
  it("should render children", () => {
    render(
      <AuthPage>
        <p>Sign in form</p>
      </AuthPage>
    );

    expect(screen.getByText("Sign in form")).toBeInTheDocument();
  });

  it("should render main landmark with correct layout classes", () => {
    render(
      <AuthPage>
        <span>Content</span>
      </AuthPage>
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass(
      "flex",
      "min-h-screen",
      "flex-col",
      "items-center",
      "justify-center"
    );
  });

  it("should render logo image with accessible name", () => {
    render(
      <AuthPage>
        <div>Child</div>
      </AuthPage>
    );

    const logo = screen.getByRole("img", { name: "SocialMediaLogo" });
    expect(logo).toBeInTheDocument();
  });

  it("should render multiple children", () => {
    render(
      <AuthPage>
        <h1>Title</h1>
        <form aria-label="Auth form">
          <button type="submit">Submit</button>
        </form>
      </AuthPage>
    );

    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Auth form" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});

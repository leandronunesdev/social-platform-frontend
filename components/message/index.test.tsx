import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Message from ".";

describe("Error Message Component", () => {
  it("should render with a message", () => {
    render(<Message message="Error" />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});

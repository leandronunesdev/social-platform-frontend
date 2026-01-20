import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from ".";

describe("TextArea Component", () => {
  it("should render textarea with label", () => {
    render(<TextArea label="Bio" id="bio" />);

    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
  });
});

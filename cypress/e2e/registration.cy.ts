/// <reference types="cypress" />

import {
  generateRandomEmail,
  generateRandomUsername,
} from "../support/commands";

describe("Registration Flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should successfully register a new user", () => {
    cy.visit("/register");

    const username = generateRandomUsername();
    const email = generateRandomEmail();

    cy.register("John Doe", username, email, "password123", "password123");

    cy.url().should("include", "/profile");
  });

  it("should display error for invalid email", () => {
    cy.visit("/register");

    cy.get('input[id="email"]').type("invalid-email");
    cy.get('input[id="email"]').blur();
  });

  it("should display error for mismatched passwords", () => {
    cy.visit("/register");

    cy.get('input[id="password"]').type("password123");
    cy.get('input[id="confirmPassword"]').type("different123");
    cy.get('input[id="confirmPassword"]').blur();
  });
});

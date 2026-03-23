/// <reference types="cypress" />

describe("Password Reset Flow", () => {
  it("should complete the password reset journey", () => {
    cy.intercept("POST", "**/auth/passwordReset", {
      statusCode: 200,
      body: { message: "Code sent" },
    }).as("passwordReset");

    cy.intercept("POST", "**/auth/validateCode", {
      statusCode: 200,
      body: { message: "Code valid" },
    }).as("validateCode");

    cy.intercept("POST", "**/auth/setNewPassword", {
      statusCode: 200,
      body: { message: "Password updated" },
    }).as("setNewPassword");

    cy.visit("/password-reset");
    cy.get('input[id="email"]').type("john@example.com");
    cy.get('button[type="submit"]').click();
    cy.wait("@passwordReset");

    cy.url().should("include", "/password-reset/validate-code");
    cy.get('input[id="code"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.wait("@validateCode");

    cy.url().should("include", "/password-reset/new-password");
    cy.get('input[id="newPassword"]').type("Password123");
    cy.get('input[id="confirmPassword"]').type("Password123");
    cy.get('button[type="submit"]').click();
    cy.wait("@setNewPassword");

    cy.url().should("include", "/login?from=passwordReset");
  });
});

/// <reference types="cypress" />

describe("Login Flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should successfully login with valid credentials", () => {
    cy.login("john5@example.com", "password123");

    cy.url().should("include", "/home");
  });

  it("should display error for invalid credentials", () => {
    cy.login("wrong@example.com", "wrongpassword");
  });

  it("should redirect to home if already authenticated", () => {
    cy.login("john5@example.com", "password123");
    cy.url().should("include", "/home");

    cy.visit("/login");

    cy.url().should("include", "/home");
  });
});

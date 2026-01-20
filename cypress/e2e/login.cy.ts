/**
 * Example E2E test for login flow
 *
 * This is a reference example. Implement your own tests following this pattern.
 */

describe("Login Flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should successfully login with valid credentials", () => {
    cy.visit("/login");

    cy.get('input[id="email"]').type("user@example.com");
    cy.get('input[id="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Should redirect to home after successful login
    cy.url().should("include", "/home");
  });

  it("should display error for invalid credentials", () => {
    cy.visit("/login");

    cy.get('input[id="email"]').type("wrong@example.com");
    cy.get('input[id="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Check for error message
    // cy.contains("Invalid credentials").should("be.visible");
  });

  it("should redirect to home if already authenticated", () => {
    // Set token in localStorage to simulate authenticated user
    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", "fake-token");
    });

    cy.visit("/login");

    // Should redirect to home
    cy.url().should("include", "/home");
  });

  // TODO: Add more test cases for:
  // - Form validation
  // - Loading state
  // - Token storage after login
});

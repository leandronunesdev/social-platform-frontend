/**
 * Example E2E test for registration flow
 *
 * This is a reference example. Implement your own tests following this pattern.
 */

describe("Registration Flow", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
  });

  it("should successfully register a new user", () => {
    cy.visit("/register");

    // Fill registration form
    cy.get('input[id="name"]').type("John Doe");
    cy.get('input[id="username"]').type("johndoe");
    cy.get('input[id="email"]').type("john@example.com");
    cy.get('input[id="password"]').type("password123");
    cy.get('input[id="confirmPassword"]').type("password123");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should redirect to profile page after successful registration
    cy.url().should("include", "/profile");
  });

  it("should display error for invalid email", () => {
    cy.visit("/register");

    cy.get('input[id="email"]').type("invalid-email");
    cy.get('input[id="email"]').blur();

    // Check for validation error (adjust selector based on your error display)
    // cy.get('[data-testid="email-error"]').should("be.visible");
  });

  it("should display error for mismatched passwords", () => {
    cy.visit("/register");

    cy.get('input[id="password"]').type("password123");
    cy.get('input[id="confirmPassword"]').type("different123");
    cy.get('input[id="confirmPassword"]').blur();

    // Check for password mismatch error
    // cy.contains("Passwords do not match").should("be.visible");
  });

  // TODO: Add more test cases for:
  // - API error handling (username/email already exists)
  // - Form validation errors
  // - Loading state during submission
  // - Redirect after successful registration
});

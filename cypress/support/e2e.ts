// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Mock API endpoints for E2E tests
// This allows tests to run without a real backend server
beforeEach(() => {
  // Create a valid JWT token for testing (format: header.payload.signature)
  // This token has an expiration far in the future (year 2099)
  const createMockToken = () => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        sub: "test-user",
        exp: Math.floor(new Date("2099-12-31").getTime() / 1000),
        iat: Math.floor(Date.now() / 1000),
      })
    );
    const signature = "mock-signature";
    return `${header}.${payload}.${signature}`;
  };

  const mockToken = createMockToken();

  // Use pattern matching to catch API calls regardless of the base URL
  // App uses NEXT_PUBLIC_API_URL + /auth/login (no /api/ in path)
  // This works with both localhost:4000 and any other API URL

  // Mock login endpoint
  cy.intercept("POST", "**/auth/login", (req) => {
    const { email, password } = req.body;

    // Simulate successful login for valid credentials
    if (email === "john5@example.com" && password === "password123") {
      req.reply({
        statusCode: 200,
        body: {
          message: "Login successful",
          token: mockToken,
        },
      });
    } else {
      // Simulate failed login for invalid credentials
      req.reply({
        statusCode: 401,
        body: {
          message: "Invalid credentials",
        },
      });
    }
  }).as("loginRequest");

  // Mock registration endpoint
  cy.intercept("POST", "**/auth/registerAccount", {
    statusCode: 200,
    body: {
      token: mockToken,
    },
  }).as("registerRequest");

  // Mock profile update endpoint
  cy.intercept("PUT", "**/auth/updateProfile", {
    statusCode: 200,
    body: {
      message: "Profile updated successfully",
    },
  }).as("updateProfileRequest");
});

// Alternatively you can use CommonJS syntax:
// require('./commands')

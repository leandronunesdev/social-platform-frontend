/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(
        name: string,
        username: string,
        email: string,
        password: string,
        confirmPassword: string
      ): Chainable<void>;
    }
  }
}

export function generateRandomUsername(): string {
  const timestamp = Date.now().toString(36).slice(-6);
  const random = Math.random().toString(36).substring(2, 12);
  return `u_${timestamp}${random}`;
}

export function generateRandomEmail(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `user_${timestamp}_${random}@example.com`;
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('input[id="email"]').type(email);
  cy.get('input[id="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add(
  "register",
  (
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="username"]').type(username);
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);
    cy.get('input[id="confirmPassword"]').type(confirmPassword);
    cy.get('button[type="submit"]').click();
  }
);

export {};

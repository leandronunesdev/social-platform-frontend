/// <reference types="cypress" />

import {
  generateRandomUsername,
  generateRandomEmail,
} from "../support/commands";

describe("Profile registration flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should successfully fill a new profile", () => {
    cy.visit("/login");

    cy.get('a[href="/register"]').click();

    cy.url().should("include", "/register");

    const username = generateRandomUsername();
    const email = generateRandomEmail();

    cy.register("John Doe", username, email, "password123", "password123");

    cy.url().should("include", "/profile");

    cy.get('textarea[id="bio"]').type("This is a bio");
    cy.get('input[id="country"]').type("Brazil");
    cy.get('input[id="state"]').type("Parana");
    cy.get('input[id="city"]').type("Curitiba");
    cy.get('input[id="avatar"]').type("https://i.pravatar.cc/300");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/home");
  });
});

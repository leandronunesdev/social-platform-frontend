# Testing Guide

This project uses Jest for unit tests and Cypress for E2E tests.

## Unit Tests (Jest + React Testing Library)

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Test Structure

- Unit tests are located in `__tests__/` directory
- Example tests are provided as reference:
  - `__tests__/lib/auth/token.test.ts` - Token utilities
  - `__tests__/lib/validations/register.test.ts` - Validation schemas
  - `__tests__/components/input.test.tsx` - Component tests

### Writing Tests

1. Create test files following the pattern: `*.test.ts` or `*.test.tsx`
2. Use React Testing Library for component tests
3. Mock external dependencies (API calls, localStorage, etc.)
4. Follow the examples provided in `__tests__/` directory

## E2E Tests (Cypress)

### Running Tests

```bash
# Open Cypress Test Runner (interactive)
yarn cypress:open

# Run tests headlessly
yarn cypress:run
```

### Test Structure

- E2E tests are located in `cypress/e2e/` directory
- Example tests provided:
  - `cypress/e2e/registration.cy.ts` - Registration flow
  - `cypress/e2e/login.cy.ts` - Login flow

### Writing E2E Tests

1. Create test files in `cypress/e2e/` with `.cy.ts` extension
2. Use custom commands from `cypress/support/commands.ts`
3. Follow the examples provided
4. Make sure your dev server is running (`yarn dev`) before running tests

### Custom Commands

Custom Cypress commands are defined in `cypress/support/commands.ts`:
- `cy.login(email, password)` - Helper to login a user

## Test Coverage Goals

- Unit tests: Critical utilities, validation schemas, API clients
- E2E tests: Complete user flows (registration, login, profile update)

## Notes

- Example tests include `TODO` comments indicating areas to expand
- Implement your own tests following the provided patterns
- Update test selectors based on your actual component structure

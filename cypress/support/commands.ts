/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for tab navigation
// @ts-ignore
Cypress.Commands.add('tab', () => {
  cy.focused().trigger('keydown', { keyCode: 9 });
});

// Custom command for login with credentials
Cypress.Commands.add(
  // @ts-ignore
  'loginWithCredentials',
  (email: string, password: string) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button', 'Увійти').click();
  },
);

// Custom command to mock successful login response
// @ts-ignore
Cypress.Commands.add('mockLoginSuccess', (isNewUser: boolean = false) => {
  cy.intercept('POST', '**/auth/login', {
    statusCode: 200,
    body: {
      data: {
        token: 'mock-jwt-token-123',
        isNewUser,
      },
      message: 'Login successful',
      errors: null,
    },
  }).as('loginRequest');
});

// Custom command to mock login error
Cypress.Commands.add(
  // @ts-ignore
  'mockLoginError',
  (statusCode: number = 401, message: string = 'Invalid credentials') => {
    cy.intercept('POST', '**/auth/login', {
      statusCode,
      body: {
        data: null,
        message,
        errors: ['Email or password is incorrect'],
      },
    }).as('loginError');
  },
);

// @ts-ignore
declare global {
  namespace Cypress {
    interface Chainable {
      // @ts-ignore
      tab(): Chainable<void>;
      // @ts-ignore
      loginWithCredentials(email: string, password: string): Chainable<void>;
      // @ts-ignore
      mockLoginSuccess(isNewUser?: boolean): Chainable<void>;
      // @ts-ignore
      mockLoginError(statusCode?: number, message?: string): Chainable<void>;
    }
  }
}

describe('Pets Page Navigation', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should navigate to pet page when clicking "Детальніше" link', () => {
    cy.visit('/pets');

    cy.get('[data-cy="pets-grid"]').should('exist');

    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .then(($el) => {
        cy.log($el.html());
      });

    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy="details-link"]').should('be.visible').click();
      });

    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');
  });

  it('should navigate to pet page by clicking on "Детальніше" link', () => {
    cy.visit('/pets');

    cy.get('[data-cy="pets-grid"]').should('exist');

    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .then(($el) => {
        cy.log($el.html());
      });

    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy="details-link"]').should('be.visible').click();
      });

    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');
  });

  it('should navigate back to pets list from pet detail page', () => {
    cy.visit('/pets');

    cy.get('[data-cy="pets-grid"]').should('exist');

    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .then(($el) => {
        cy.log($el.html());
      });

    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy="details-link"]').should('be.visible').click();
      });

    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');

    cy.go('back');

    cy.url().should('eq', Cypress.config().baseUrl + '/pets');
  });

  it('should visit a pet detail page from the pets page and verify redirection', () => {
    cy.visit('/pets');

    cy.get('[data-cy="pets-grid"]').should('exist');

    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy="details-link"]').should('be.visible').click();
      });

    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');

    cy.get('section.section').should('exist');
    cy.get('h1').should('be.visible');
  });
});

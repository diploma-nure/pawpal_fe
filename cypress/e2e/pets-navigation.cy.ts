describe('Pets Page Navigation', () => {
  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should navigate to pet page when clicking "Детальніше" link', () => {
    cy.visit('/pets');

    // Wait for pets to load
    cy.get('[data-cy="pets-grid"]').should('exist');

    // Debugging: Log the DOM structure of the first pet card
    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .then(($el) => {
        cy.log($el.html());
      });

    // Get the first pet card and click "Детальніше"
    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy="details-link"]').should('be.visible').click();
      });

    // Check URL changed to pet detail page
    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');
  });

  it('should navigate to pet page by clicking on "Детальніше" link', () => {
    cy.visit('/pets');

    // Wait for pets to load
    cy.get('[data-cy="pets-grid"]').should('exist');

    // Debugging: Log the DOM structure of the first pet card
    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .then(($el) => {
        cy.log($el.html());
      });

    // Click the "Детальніше" link directly
    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy="details-link"]').should('be.visible').click();
      });

    // Check URL changed to pet detail page
    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');
  });

  it('should navigate back to pets list from pet detail page', () => {
    cy.visit('/pets');

    // Navigate to a pet detail page using the "Детальніше" link
    cy.get('[data-cy="pets-grid"]').should('exist');

    // Debugging: Log the DOM structure of the first pet card
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

    // Verify we're on pet detail page
    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');

    // Navigate back using browser back button
    cy.go('back');

    // Should be back on pets listing page
    cy.url().should('eq', Cypress.config().baseUrl + '/pets');
  });

  it('should visit a pet detail page from the pets page and verify redirection', () => {
    // Visit the pets page
    cy.visit('/pets');

    // Wait for the pets grid to load
    cy.get('[data-cy="pets-grid"]').should('exist');

    // Click on the "Детальніше" link of the first pet
    cy.get('[data-cy="pets-grid"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cy="details-link"]').should('be.visible').click();
      });

    // Verify redirection to the pet detail page
    cy.url().should('include', '/pets/');
    cy.url().should('not.eq', Cypress.config().baseUrl + '/pets');

    // Ensure the pet detail page content is loaded
    cy.get('section.section').should('exist');
    cy.get('h1').should('be.visible');
  });
});

describe('SignUpForm Login', () => {
  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();

    // Visit the login page
    cy.visit('/log-in');
  });

  it('should display the login form correctly', () => {
    // Check if the form elements are present
    cy.get('form').should('exist');
    cy.contains('Ласкаво просимо до PawPal').should('be.visible');
    cy.contains('Щоб продовжити увійдіть або зареєструйтесь до системи').should(
      'be.visible',
    );

    // Check form inputs
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');

    // Check buttons
    cy.contains('button', 'Увійти').should('exist');
    cy.contains('button', 'Забули пароль?').should('exist');
    cy.contains('button', 'Продовжити з Google').should('exist');
  });

  it('should show validation errors for empty fields', () => {
    // Try to submit form without filling fields
    cy.contains('button', 'Увійти').click();

    // Check for validation errors
    cy.contains('Введіть e-mail').should('be.visible');
    cy.contains('Введіть пароль').should('be.visible');
  });

  it('should show validation error for invalid email format', () => {
    // Enter invalid email
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.contains('button', 'Увійти').click();

    // Check for email validation error
    cy.contains('E-mail не коректний').should('be.visible');
  });

  it('should show validation error for short password', () => {
    // Enter valid email but short password
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('123');
    cy.contains('button', 'Увійти').click();

    // Check for password validation error
    cy.contains('Пароль повинен містити не менше 6 символів').should(
      'be.visible',
    );
  });

  it('should successfully login with valid credentials for existing user', () => {
    // Mock the API response for existing user
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        data: {
          token: 'mock-jwt-token-123',
          isNewUser: false,
        },
        message: 'Login successful',
        errors: null,
      },
    }).as('loginRequest');

    // Fill form with valid credentials
    cy.get('input[name="email"]').type('existing@example.com');
    cy.get('input[name="password"]').type('password123');

    // Submit form
    cy.contains('button', 'Увійти').click();

    // Wait for the API call
    cy.wait('@loginRequest');

    // Check if token is set in cookies
    cy.getCookie('token').should(
      'have.property',
      'value',
      'mock-jwt-token-123',
    );

    // Check navigation to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should redirect new user to survey page after login', () => {
    // Mock the API response for new user
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        data: {
          token: 'mock-jwt-token-456',
          isNewUser: true,
        },
        message: 'Login successful',
        errors: null,
      },
    }).as('loginNewUser');

    // Fill form with valid credentials
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123');

    // Submit form
    cy.contains('button', 'Увійти').click();

    // Wait for the API call
    cy.wait('@loginNewUser');

    // Check if token is set in cookies
    cy.getCookie('token').should(
      'have.property',
      'value',
      'mock-jwt-token-456',
    );

    // Check navigation to survey page
    cy.url().should('eq', Cypress.config().baseUrl + '/survey');
  });

  it('should navigate to reset password page when forgot password is clicked', () => {
    cy.contains('button', 'Забули пароль?').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/reset-password');
  });

  it('should handle Google sign-in button click', () => {
    // Mock next-auth signIn function if needed
    cy.window().then((win) => {
      cy.stub(win, 'open').as('googleSignIn');
    });

    cy.contains('button', 'Продовжити з Google').click();

    // Note: Testing actual Google OAuth flow is complex and usually done with mocks
    // This test just ensures the button works and doesn't break the page
    cy.get('form').should('exist'); // Form should still be visible
  });

  it('should be accessible and focusable', () => {
    // Test that form elements can be focused
    cy.get('input[name="email"]').focus().should('be.focused');
    cy.get('input[name="password"]').focus().should('be.focused');
    cy.contains('button', 'Забули пароль?').focus().should('be.focused');
    cy.contains('button', 'Увійти').focus().should('be.focused');
  });
});

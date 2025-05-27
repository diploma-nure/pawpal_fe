import { FieldErrors } from 'react-hook-form';
import { ErrorBanner } from './ErrorBanner';

type TestFieldErrors = FieldErrors<{
  field1?: { message?: string; nestedField?: { message?: string } };
  field2?: { message?: string };
}>;

describe('<ErrorBanner />', () => {
  it('renders error messages when errors are present', () => {
    const errors: TestFieldErrors = {
      field1: { message: 'Error in field1' },
      field2: { message: 'Error in field2' },
    };

    cy.mount(<ErrorBanner errors={errors} />);

    cy.get('h3').should('contain.text', 'Ой, халепа, виправте наступне:');
    cy.get('ul').within(() => {
      cy.get('li').should('have.length', 2);
      cy.contains('Error in field1').should('exist');
      cy.contains('Error in field2').should('exist');
    });
  });

  it('renders nested error messages', () => {
    const errors: TestFieldErrors = {
      field1: {
        nestedField: { message: 'Nested error in field1' },
      },
    };

    cy.mount(<ErrorBanner errors={errors} />);

    cy.get('ul').within(() => {
      cy.contains('Nested error in field1').should('exist');
    });
  });
});

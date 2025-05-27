import { Modal } from './Modal';

describe('<Modal />', () => {
  it('renders correctly when open', () => {
    cy.mount(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>,
    );

    cy.get('.ReactModal__Overlay').should('exist');
    cy.get('.ReactModal__Content').should('exist');
    cy.contains('Modal Content').should('exist');
  });

  it('does not render when closed', () => {
    cy.mount(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>,
    );

    cy.get('.ReactModal__Overlay').should('not.exist');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = cy.stub();
    cy.mount(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>,
    );

    cy.get('button').click();
    cy.wrap(onClose).should('have.been.calledOnce');
  });

  it('renders custom title icon', () => {
    const CustomIcon = () => <span data-testid="custom-icon">Custom Icon</span>;
    cy.mount(
      <Modal isOpen={true} onClose={() => {}} renderTitleIcon={CustomIcon}>
        <p>Modal Content</p>
      </Modal>,
    );

    cy.get('[data-testid="custom-icon"]').should('exist');
  });
});

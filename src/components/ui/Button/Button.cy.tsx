import { Button } from './Button';
import styles from './styles.module.scss';

describe('<Button />', () => {
  it('renders', () => {
    cy.mount(<Button>Click Me</Button>);
    cy.contains('Click Me').should('exist');
  });

  it('renders with left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const RightIcon = () => <span data-testid="right-icon">R</span>;

    cy.mount(
      <Button leftIcon={LeftIcon} rightIcon={RightIcon}>
        Click Me
      </Button>,
    );

    cy.get('[data-testid="left-icon"]').should('exist');
    cy.get('[data-testid="right-icon"]').should('exist');
  });

  it('applies the correct variant, color, and size classes', () => {
    cy.mount(
      <Button variant="outline" color="primary" size="lg">
        Click Me
      </Button>,
    );

    cy.get('button')
      .and('have.class', styles.button_primary_outline)
      .and('have.class', styles.button_lg);
  });

  it('handles click events', () => {
    const onClick = cy.stub();
    cy.mount(<Button onClick={onClick}>Click Me</Button>);

    cy.contains('Click Me').click();
    cy.wrap(onClick).should('have.been.calledOnce');
  });
});

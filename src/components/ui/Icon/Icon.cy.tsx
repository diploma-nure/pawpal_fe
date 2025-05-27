import { Icon } from './Icon';

describe('<Icon />', () => {
  it('renders correctly with default props', () => {
    cy.mount(<Icon name="check" />);

    cy.get('svg').should('exist');
    cy.get('use')
      .should('have.attr', 'xlink:href')
      .and('match', /\/sprite\.[a-zA-Z0-9]+\.svg#icon-check$/);
    cy.get('svg').should('have.attr', 'fill', '#020454');
    cy.get('svg').should('have.attr', 'width', '24');
    cy.get('svg').should('have.attr', 'height', '24');
  });

  it('applies custom props correctly', () => {
    cy.mount(
      <Icon
        name="close"
        className="custom-class"
        fill="#ff0000"
        width={32}
        height={32}
      />,
    );

    cy.get('svg').should('have.class', 'custom-class');
    cy.get('use')
      .should('have.attr', 'xlink:href')
      .and('match', /\/sprite\.[a-zA-Z0-9]+\.svg#icon-close$/);
    cy.get('svg').should('have.attr', 'fill', '#ff0000');
    cy.get('svg').should('have.attr', 'width', '32');
    cy.get('svg').should('have.attr', 'height', '32');
  });
});

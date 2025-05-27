import { Tag } from './Tag';
import styles from './styles.module.scss';

describe('<Tag />', () => {
  it('renders with default variant', () => {
    cy.mount(<Tag>Default Tag</Tag>);

    cy.get('div').should('have.class', styles.tag);
    cy.get('div').should('not.have.class', styles.tag_gender);
    cy.get('div').should('not.have.class', styles.tag_age);
    cy.get('div').should('not.have.class', styles.tag_size);
    cy.get('div').should('not.have.class', styles.tag_specialNeeds);
    cy.contains('Default Tag').should('exist');
  });

  it('applies the correct variant class', () => {
    cy.mount(<Tag variant="gender">Gender Tag</Tag>);

    cy.get('div').should('have.class', styles.tag);
    cy.get('div').should('have.class', styles.tag_gender);
    cy.contains('Gender Tag').should('exist');
  });

  it('applies custom class names', () => {
    cy.mount(<Tag className="custom-class">Custom Tag</Tag>);

    cy.get('div').should('have.class', 'custom-class');
    cy.contains('Custom Tag').should('exist');
  });
});

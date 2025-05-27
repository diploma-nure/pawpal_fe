import { Divider } from './Divider';
import styles from './styles.module.scss';

describe('<Divider />', () => {
  it('renders with default variant', () => {
    cy.mount(<Divider variant="beige" />);

    cy.get('div').should('have.class', styles.divider);
    cy.get('div').should('have.class', styles['divider-beige']);
  });
});

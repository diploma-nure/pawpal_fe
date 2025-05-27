import { Checkbox } from './Checkbox';

describe('<Checkbox />', () => {
  it('renders correctly', () => {
    cy.mount(
      <Checkbox
        option="option1"
        content="Test Checkbox"
        checked={false}
        toggleOption={() => {}}
      />,
    );

    cy.contains('Test Checkbox').should('exist');
    cy.get('input[type="checkbox"]').should('not.be.checked');
  });

  it('toggles the checkbox state', () => {
    const toggleOption = cy.stub();

    cy.mount(
      <Checkbox
        option="option1"
        content="Test Checkbox"
        checked={false}
        toggleOption={toggleOption}
      />,
    );

    cy.get('input[type="checkbox"]').click();
    cy.wrap(toggleOption).should('have.been.calledWith', 'option1', true);
  });

  it('applies custom content class name', () => {
    cy.mount(
      <Checkbox
        option="option1"
        content="Test Checkbox"
        checked={false}
        contentClassname="custom-class"
        toggleOption={() => {}}
      />,
    );

    cy.get('p').should('have.class', 'custom-class');
  });
});

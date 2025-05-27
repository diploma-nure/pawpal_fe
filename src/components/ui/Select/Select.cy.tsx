import { Select } from './Select';
import styles from './styles.module.scss';

describe('<Select />', () => {
  it('renders with placeholder', () => {
    const options = [
      { title: 'Option 1', value: 1 },
      { title: 'Option 2', value: 2 },
    ];

    cy.mount(
      <Select
        placeholder="Select an option"
        options={options}
        value={null}
        onChange={() => {}}
      />,
    );

    cy.contains('Select an option').should('exist');
  });

  it('opens dropdown on click', () => {
    const options = [
      { title: 'Option 1', value: 1 },
      { title: 'Option 2', value: 2 },
    ];

    cy.mount(<Select options={options} value={null} onChange={() => {}} />);

    // Use CSS class selector format
    cy.get(`.${styles.selectHeader}`).should('exist').click();
    cy.get(`.${styles.optionsList}`).should('exist');
  });

  it('selects an option', () => {
    const options = [
      { title: 'Option 1', value: 1 },
      { title: 'Option 2', value: 2 },
    ];
    const onChange = cy.stub();

    cy.mount(<Select options={options} value={null} onChange={onChange} />);

    // Open dropdown first
    cy.get(`.${styles.selectHeader}`).click();

    // Click the option (which is now a Checkbox component)
    cy.contains('Option 1').should('exist').click();
    cy.wrap(onChange).should('have.been.calledWith', 1);
  });

  it('supports multiselect', () => {
    const options = [
      { title: 'Option 1', value: 1 },
      { title: 'Option 2', value: 2 },
    ];
    const onChange = cy.stub();

    cy.mount(
      <Select options={options} value={[]} onChange={onChange} multiselect />,
    );

    // Open dropdown first
    cy.get(`.${styles.selectHeader}`).click();

    // Now the options should be visible
    cy.contains('Option 1').should('exist').click();
    cy.wrap(onChange).should('have.been.calledWith', [1]);
  });

  // Additional test to verify dropdown closes after single selection
  it('closes dropdown after single selection', () => {
    const options = [
      { title: 'Option 1', value: 1 },
      { title: 'Option 2', value: 2 },
    ];
    const onChange = cy.stub();

    cy.mount(<Select options={options} value={null} onChange={onChange} />);

    cy.get(`.${styles.selectHeader}`).click();
    cy.get(`.${styles.optionsList}`).should('exist');

    cy.contains('Option 1').click();

    // Dropdown should close after selection
    cy.get(`.${styles.optionsList}`).should('not.exist');
  });

  // Test for multiselect behavior - dropdown stays open
  it('keeps dropdown open in multiselect mode', () => {
    const options = [
      { title: 'Option 1', value: 1 },
      { title: 'Option 2', value: 2 },
    ];
    const onChange = cy.stub();

    cy.mount(
      <Select options={options} value={[]} onChange={onChange} multiselect />,
    );

    cy.get(`.${styles.selectHeader}`).click();
    cy.contains('Option 1').click();

    // Dropdown should remain open in multiselect mode
    cy.get(`.${styles.optionsList}`).should('exist');

    // Should be able to select another option
    cy.contains('Option 2').click();
    cy.wrap(onChange).should('have.been.calledWith', [2]);
  });
});

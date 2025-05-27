import { RadioGroup } from './RadioGroup';

describe('<RadioGroup />', () => {
  it('renders all radio options', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    cy.mount(<RadioGroup name="test" options={options} />);

    cy.get('input[type="radio"]').should('have.length', 2);
    cy.contains('Option 1').should('exist');
    cy.contains('Option 2').should('exist');
  });

  it('selects the default value', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    cy.mount(
      <RadioGroup name="test" options={options} defaultValue="option2" />,
    );

    cy.get('input[value="option2"]').should('be.checked');
  });

  it('calls onChange when a radio option is selected', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    const onChange = cy.stub();

    cy.mount(<RadioGroup name="test" options={options} onChange={onChange} />);

    cy.get('input[value="option1"]').click();
    cy.wrap(onChange).should('have.been.calledWith', 'option1');
  });
});

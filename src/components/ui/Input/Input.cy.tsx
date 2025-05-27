import { useForm } from 'react-hook-form';
import { Input } from './Input';
import styles from './styles.module.scss';

describe('<Input />', () => {
  const TestForm = ({
    defaultValue = '',
    error,
  }: {
    defaultValue?: string;
    error?: string;
  }) => {
    const { control } = useForm({
      defaultValues: { testInput: defaultValue },
    });

    return (
      <Input
        name="testInput"
        control={control}
        label="Test Label"
        error={error ? { type: 'max', message: error } : undefined}
      />
    );
  };

  it('renders with label and default value', () => {
    cy.mount(<TestForm defaultValue="Default Value" />);

    cy.get('p').contains('Test Label').should('exist');
    cy.get('input').should('have.value', 'Default Value');
  });

  it('displays error message when error is present', () => {
    cy.mount(<TestForm error="This is an error" />);

    cy.get('p').contains('This is an error').should('exist');
    cy.get('input').should('have.class', styles.error);
  });

  it('updates value on user input', () => {
    cy.mount(<TestForm />);

    cy.get('input').type('New Value');
    cy.get('input').should('have.value', 'New Value');
  });
});

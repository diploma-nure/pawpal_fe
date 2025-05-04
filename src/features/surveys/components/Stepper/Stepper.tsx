import clsx from 'clsx';
import { FC } from 'react';
import styles from './styles.module.scss';

export interface StepperProps {
  currentStep?: number;
}

const defaultSteps = [
  { id: 1, label: 'Контактна інформація' },
  { id: 2, label: 'Про тваринку' },
  { id: 3, label: 'Умови проживання' },
  { id: 4, label: 'Досвід та очікування' },
  { id: 5, label: 'Відповідальність' },
];

export const Stepper: FC<StepperProps> = ({ currentStep = 1 }) => {
  return (
    <div className={styles.stepper}>
      {defaultSteps.map((step) => (
        <div
          key={step.id}
          className={clsx(
            styles.step,
            { [styles.completed]: step.id <= currentStep },
            { [styles.active]: step.id === currentStep },
          )}
        >
          <div className={styles.stepLabel}>{step.label}</div>
          <div className={styles.stepIndicator}>
            <span className={styles.stepNumber}>{step.id}</span>
          </div>
          {step.id < defaultSteps.length && (
            <div className={styles.connector} />
          )}
        </div>
      ))}
    </div>
  );
};

import clsx from 'clsx';
import { steps } from '../../sections/StepsSection/constants';
import styles from './styles.module.scss';

export const StepsList = () => {
  return (
    <div className={styles.steps}>
      {steps.map((step, i) => (
        <div key={step.id} className={styles.step}>
          <div className={styles.stepHeader}>
            <div className={styles.line} />
            <div
              className={clsx(
                styles.stepWrapper,
                styles[`stepWrapper-${i + 1}`],
              )}
            >
              <p className={clsx(styles.stepNumber)}>{step.id}</p>
            </div>
            <div className={styles.line} />
          </div>

          <div className={styles.contentWrapper}>
            <h3 className={styles['step-title']}>{step.title}</h3>
            <p className={styles['step-description']}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

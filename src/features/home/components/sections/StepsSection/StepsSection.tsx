import { Container } from '@/components/layout';
import { AccentText, Button } from '@/components/ui';
import clsx from 'clsx';
import { steps } from './constants';
import styles from './styles.module.scss';

export const StepsSection = () => {
  return (
    <Container>
      <div className="grid">
        <div className="col-desktop-1-6">
          <h2 className={styles.title}>
            4 простих кроки <br />
            до <AccentText color="#E66A58">очікуваної</AccentText> зустрічі
          </h2>
        </div>

        <div className={clsx('col-desktop-10-12', styles.buttonWrapper)}>
          <div className={styles.buttonWrapper}>
            <Button>Знайти друга</Button>
          </div>
        </div>

        <div className={clsx('col-desktop-1-12', styles.stepsWrapper)}>
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
                  <p className={styles['step-description']}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

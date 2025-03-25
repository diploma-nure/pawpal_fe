import { Container } from '@/components/layout';
import { AccentText, Button } from '@/components/ui';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import { StepsList } from '../../ui/StepsList/StepsList';
import styles from './styles.module.scss';

export const StepsSection = () => {
  return (
    <section className="section">
      <Container>
        <div className="grid">
          <div className="col-desktop-1-6 col-tablet-1-4 col-1-2">
            <h2 className={clsx(styles.title, 'heading2')}>
              4 простих кроки <br />
              до <AccentText color={colors.orange}>очікуваної</AccentText>{' '}
              зустрічі
            </h2>
          </div>

          <div
            className={clsx(
              'col-desktop-10-12 col-tablet-5-6 col-1-2',
              styles.buttonWrapper,
            )}
          >
            <div className={styles.buttonWrapper}>
              <Button>Знайти друга</Button>
            </div>
          </div>

          <div
            className={clsx(
              'col-desktop-1-12 col-tablet-1-6 col-1-2',
              styles.stepsWrapper,
            )}
          >
            <StepsList />
          </div>
        </div>
      </Container>
    </section>
  );
};

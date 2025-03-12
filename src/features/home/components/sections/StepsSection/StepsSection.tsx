import { Container } from '@/components/layout';
import { AccentText, Button } from '@/components/ui';
import clsx from 'clsx';
import { StepsList } from '../../ui/StepsList/StepsList';
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
          <StepsList />
        </div>
      </div>
    </Container>
  );
};

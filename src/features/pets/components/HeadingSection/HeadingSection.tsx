import { SurveyButton } from '@/features/pets/components/HeadingSection/SurveyButton';
import clsx from 'clsx';
import styles from './styles.module.scss';

export const HeadingSection = () => {
  return (
    <div className="section grid">
      <div className="col-desktop-1-8 col-tablet-1-6 col-1-2">
        <h1 className="heading1">Знайди свого майбутнього друга</h1>
      </div>

      <div
        className={clsx(
          'col-desktop-9-12 col-tablet-1-6 col-1-2',
          styles.surveyRedirection,
        )}
      >
        <p className={styles.surveyRedirection__text}>
          Заповни анкету — і ми підберемо того самого пухнастика, який чекає
          саме на тебе
        </p>
        <SurveyButton />
      </div>
    </div>
  );
};

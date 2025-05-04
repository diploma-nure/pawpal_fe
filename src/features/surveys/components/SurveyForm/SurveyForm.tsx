import { AboutPetForm } from '@/features/surveys/components/SurveyForm/forms/AboutPetForm';
import { ExperienceAndExpectationsForm } from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm';
import { FinishMessage } from '@/features/surveys/components/SurveyForm/forms/FinishMessage';
import { LifeConditionForm } from '@/features/surveys/components/SurveyForm/forms/LifeConditionForm';
import { NameForm } from '@/features/surveys/components/SurveyForm/forms/NameForm/NameForm';
import { ResponsibilityForm } from '@/features/surveys/components/SurveyForm/forms/ResponsibilityForm';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  currentStep: number | undefined;
};

export const SurveyForm: FC<Props> = ({ currentStep = 1 }) => {
  const getForm = () => {
    switch (currentStep) {
      case 1:
        return <NameForm />;
      case 2:
        return <AboutPetForm />;
      case 3:
        return <LifeConditionForm />;
      case 4:
        return <ExperienceAndExpectationsForm />;
      case 5:
        return <ResponsibilityForm />;
      case 6:
        return <FinishMessage />;
      default:
        return <NameForm />;
    }
  };

  return (
    <div className={styles.container}>
      {currentStep <= 5 && (
        <div className={styles.titleContainer}>
          <h1 className="heading3">Знайди свого нового друга</h1>
          <h2>Готовий до нових хвостиків? Розкажи про себе!</h2>
        </div>
      )}

      <div className={styles.formContainer}>{getForm()}</div>
    </div>
  );
};

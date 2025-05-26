'use client';

import { Button, Input } from '@/components/ui';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import {
  responsibilityFormSchema,
  ResponsibilityFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/ResponsibilityForm/schema';
import { responsibilitySection } from '@/features/surveys/constants';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RadioSection } from './RadioSection';
import styles from './styles.module.scss';

export const ResponsibilityForm = () => {
  const { forward, back } = useForwardBack();
  const { saveData } = useFormData(5);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResponsibilityFormSchemaType>({
    resolver: zodResolver(responsibilityFormSchema),
    defaultValues: {
      understandsResponsibility: undefined,
      vacationPetCarePlan: '',
      hasSufficientFinancialResources: undefined,
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    const surveyData = {
      understandsResponsibility: data.understandsResponsibility === 'true',
      vacationPetCarePlan: data.vacationPetCarePlan,
      hasSufficientFinancialResources:
        data.hasSufficientFinancialResources === 'true',
    };

    saveData(surveyData);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <ErrorBanner errors={errors} />
      <RadioSection
        title={responsibilitySection[0].title}
        name={responsibilitySection[0].name}
        control={control}
        options={responsibilitySection[0].options}
      />

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>
          Як ви плануєте вирішувати питання догляду за твариною під час
          відпусток чи відряджень?
        </h3>
        <Input
          control={control}
          name="vacationPetCarePlan"
          placeholder="Я планую..."
        />
      </div>

      <RadioSection
        title={responsibilitySection[1].title}
        name={responsibilitySection[1].name}
        control={control}
        options={responsibilitySection[1].options}
      />

      <div className={styles.buttonsContainer}>
        <Button
          onClick={back}
          variant="outline"
          type="button"
          disabled={isSubmitting}
        >
          Повернутись
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Підтвердити
        </Button>
      </div>
    </form>
  );
};

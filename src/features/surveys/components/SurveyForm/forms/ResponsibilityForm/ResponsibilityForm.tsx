'use client';

import { Button, Input } from '@/components/ui';
import {
  responsibilityFormSchema,
  ResponsibilityFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/ResponsibilityForm/schema';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RadioSection } from './RadioSection';
import styles from './styles.module.scss';

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Так' },
  { value: 'false', label: 'Ні' },
];

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

  const radioSections = useMemo(
    () => [
      {
        title:
          'Чи розумієте ви всю відповідальність за догляд за домашньою тваринкою?',
        name: 'understandsResponsibility' as const,
        options: YES_NO_OPTIONS,
      },
      {
        title:
          'Чи маєте ви достатньо фінансових ресурсів для утримання тварини?',
        name: 'hasSufficientFinancialResources' as const,
        options: YES_NO_OPTIONS,
      },
    ],
    [],
  );

  const handleFormSubmit = handleSubmit((data) => {
    const surveyData = {
      understandsResponsibility: data.understandsResponsibility,
      vacationPetCarePlan: data.vacationPetCarePlan,
      hasSufficientFinancialResources: data.hasSufficientFinancialResources,
    };

    console.log('Form data:', data);
    console.log('Survey data:', surveyData);

    saveData(surveyData);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <RadioSection
        title={radioSections[0].title}
        name={radioSections[0].name}
        control={control}
        options={radioSections[0].options}
      />

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>
          Як ви плануєте вирішувати питання догляду за твариною під час
          відпусток чи відряджень?
        </h3>
        <Input
          control={control}
          name="vacationPetCarePlan"
          error={errors.vacationPetCarePlan}
          placeholder="Я планую..."
        />
      </div>

      <RadioSection
        title={radioSections[1].title}
        name={radioSections[1].name}
        control={control}
        options={radioSections[1].options}
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

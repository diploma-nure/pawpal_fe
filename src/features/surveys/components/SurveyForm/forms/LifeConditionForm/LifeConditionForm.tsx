'use client';

import { Button } from '@/components/ui';
import {
  lifeConditionFormSchema,
  LifeConditionFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/LifeConditionForm/schema';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RadioSection } from './RadioSection';
import styles from './styles.module.scss';

// Form section constants
const HOUSING_OPTIONS = [
  { value: '1', label: 'Приватний будинок' },
  { value: '2', label: 'Квартира' },
];

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Так' },
  { value: 'false', label: 'Ні' },
];

const PET_ALLOWED_OPTIONS = [
  { value: '2', label: 'Так' },
  { value: '1', label: 'Ні' },
  { value: '0', label: 'Не впевнений' },
];

export const LifeConditionForm = () => {
  const { forward, back } = useForwardBack();
  const { saveData } = useFormData(3);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LifeConditionFormSchemaType>({
    resolver: zodResolver(lifeConditionFormSchema),
    defaultValues: {
      housingType: undefined,
      hasYard: undefined,
      allowPets: undefined,
      hasOtherPets: undefined,
      hasChildren: undefined,
    },
  });

  // Form sections configuration
  const formSections = useMemo(
    () => [
      {
        title: 'Де ви проживаєте?',
        name: 'housingType' as const,
        options: HOUSING_OPTIONS,
      },
      {
        title: 'Чи є у вас двір або безпечне місце для вигулу?',
        name: 'hasYard' as const,
        options: YES_NO_OPTIONS,
      },
      {
        title: 'Чи дозволено у вашому житлі утримувати тварин?',
        name: 'allowPets' as const,
        options: PET_ALLOWED_OPTIONS,
      },
      {
        title: 'Чи є у вас інші домашні тварини',
        name: 'hasOtherPets' as const,
        options: YES_NO_OPTIONS,
      },
      {
        title: "Чи є в сім'ї маленькі діти?",
        name: 'hasChildren' as const,
        options: YES_NO_OPTIONS,
      },
    ],
    [],
  );

  const handleFormSubmit = handleSubmit((data) => {
    const surveyData = {
      placeOfResidence: Number(data.housingType),
      hasSafeWalkingArea: Boolean(data.hasYard),
      petsAllowedAtResidence: Number(data.allowPets),
      hasOtherPets: Boolean(data.hasOtherPets),
      hasSmallChildren: Boolean(data.hasChildren),
    };

    console.log('Form data:', data);
    console.log('Survey data:', surveyData);

    saveData(surveyData);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      {/* Dynamically generate form sections */}
      {formSections.map((section) => (
        <RadioSection
          key={section.name}
          title={section.title}
          name={section.name}
          control={control}
          options={section.options}
        />
      ))}

      {/* Form buttons */}
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

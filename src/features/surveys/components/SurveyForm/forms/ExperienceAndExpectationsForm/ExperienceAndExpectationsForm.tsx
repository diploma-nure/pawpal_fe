'use client';

import { Button } from '@/components/ui';
import {
  experienceAndExpectationsFormSchema,
  ExperienceAndExpectationsFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm/schema';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RadioSection } from './RadioSection';
import styles from './styles.module.scss';

// Form section constants
const YES_NO_OPTIONS = [
  { value: 'true', label: 'Так' },
  { value: 'false', label: 'Ні' },
];

const ACTIVITY_LEVEL_OPTIONS = [
  { value: '0', label: 'Спокійний' },
  { value: '1', label: 'Помірно активний' },
  { value: '2', label: 'Активний' },
];

export const ExperienceAndExpectationsForm = () => {
  const { forward, back } = useForwardBack();
  const { saveData } = useFormData(4);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ExperienceAndExpectationsFormSchemaType>({
    resolver: zodResolver(experienceAndExpectationsFormSchema),
    defaultValues: {
      hadPetsBefore: undefined,
      activityLevel: undefined,
      willingToAdoptSpecialNeeds: undefined,
    },
  });

  // Form sections configuration
  const formSections = useMemo(
    () => [
      {
        title: 'Чи були у вас домашні тварини раніше?',
        name: 'hadPetsBefore' as const,
        options: YES_NO_OPTIONS,
      },
      {
        title: 'Який рівень активності вам підходить?',
        name: 'activityLevel' as const,
        options: ACTIVITY_LEVEL_OPTIONS,
      },
      {
        title:
          'Чи готові ви взяти тварину з особливими потребами (інвалідність, хронічні захворювання)?',
        name: 'willingToAdoptSpecialNeeds' as const,
        options: YES_NO_OPTIONS,
      },
    ],
    [],
  );

  const handleFormSubmit = handleSubmit((data) => {
    // Map form data to survey data
    const surveyData = {
      hasOwnnedPetsBefore: data.hadPetsBefore,
      desiredActivityLevel: data.activityLevel,
      readyForSpecialNeedsPet: data.willingToAdoptSpecialNeeds,
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

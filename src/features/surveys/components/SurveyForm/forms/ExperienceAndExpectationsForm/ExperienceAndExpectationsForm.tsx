'use client';

import { Button } from '@/components/ui';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import {
  experienceAndExpectationsFormSchema,
  ExperienceAndExpectationsFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm/schema';
import { experienceSection } from '@/features/surveys/constants';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RadioSection } from './RadioSection';
import styles from './styles.module.scss';

export const ExperienceAndExpectationsForm = () => {
  const { forward, back } = useForwardBack();
  const { saveData } = useFormData(4);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<ExperienceAndExpectationsFormSchemaType>({
    resolver: zodResolver(experienceAndExpectationsFormSchema),
    defaultValues: {
      hadPetsBefore: undefined,
      activityLevel: undefined,
      willingToAdoptSpecialNeeds: undefined,
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    const surveyData = {
      hasOwnnedPetsBefore: data.hadPetsBefore,
      desiredActivityLevel: data.activityLevel,
      readyForSpecialNeedsPet: data.willingToAdoptSpecialNeeds,
    };

    saveData(surveyData);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <ErrorBanner errors={errors} />
      {experienceSection.map((section) => (
        <RadioSection
          key={section.name}
          title={section.title}
          name={section.name}
          control={control}
          options={section.options}
        />
      ))}

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

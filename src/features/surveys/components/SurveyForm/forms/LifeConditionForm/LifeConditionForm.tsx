'use client';

import { Button } from '@/components/ui';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import {
  lifeConditionFormSchema,
  LifeConditionFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/LifeConditionForm/schema';
import { lifeConditionSection } from '@/features/surveys/constants';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RadioSection } from './RadioSection';
import styles from './styles.module.scss';

export const LifeConditionForm = () => {
  const { forward, back } = useForwardBack();
  const { saveData } = useFormData(3);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
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

  const handleFormSubmit = handleSubmit((data) => {
    const surveyData = {
      placeOfResidence: Number(data.housingType),
      hasSafeWalkingArea: data.hasYard === 'true',
      petsAllowedAtResidence: Number(data.allowPets),
      hasOtherPets: data.hasOtherPets === 'true',
      hasSmallChildren: data.hasChildren === 'true',
    };

    saveData(surveyData);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <ErrorBanner errors={errors} />
      {lifeConditionSection.map((section) => (
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

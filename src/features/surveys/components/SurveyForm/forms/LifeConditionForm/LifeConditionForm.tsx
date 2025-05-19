'use client';

import { Button } from '@/components/ui';
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
      {lifeConditionSection.map((section) => (
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

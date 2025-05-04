'use client';

import { Button, RadioGroup } from '@/components/ui';
import {
  experienceAndExpectationsFormSchema,
  ExperienceAndExpectationsFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm/schema';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const ExperienceAndExpectationsForm = () => {
  const { forward, back } = useForwardBack();
  const { handleSubmit, control } =
    useForm<ExperienceAndExpectationsFormSchemaType>({
      resolver: zodResolver(experienceAndExpectationsFormSchema),
      defaultValues: {
        hadPetsBefore: undefined,
        activityLevel: undefined,
        willingToAdoptSpecialNeeds: undefined,
      },
    });

  const handleFormSubmit = handleSubmit((data) => {
    console.log(data);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>
          Чи були у вас домашні тварини раніше?
        </h3>
        <Controller
          name="hadPetsBefore"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="hadPetsBefore"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
              defaultValue={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>
          Який рівень активності вам підходить?
        </h3>
        <Controller
          name="activityLevel"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="activityLevel"
              options={[
                { value: 'calm', label: 'Спокійний' },
                { value: 'moderate', label: 'Помірно активний' },
                { value: 'active', label: 'Активний' },
              ]}
              defaultValue={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>
          Чи готові ви взяти тварину з особливими потребами (інвалідність,
          хронічні захворювання)?
        </h3>
        <Controller
          name="willingToAdoptSpecialNeeds"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="willingToAdoptSpecialNeeds"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
              defaultValue={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <Button onClick={back} variant="outline" type="button">
          Повернутись
        </Button>
        <Button type="submit">Підтвердити</Button>
      </div>
    </form>
  );
};

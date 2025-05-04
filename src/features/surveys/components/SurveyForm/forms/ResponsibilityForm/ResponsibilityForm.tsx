'use client';

import { Button, Input, RadioGroup } from '@/components/ui';
import {
  responsibilityFormSchema,
  ResponsibilityFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/ResponsibilityForm/schema';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const ResponsibilityForm = () => {
  const { forward, back } = useForwardBack();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResponsibilityFormSchemaType>({
    resolver: zodResolver(responsibilityFormSchema),
    defaultValues: {
      understandResponsibility: undefined,
      carePlanning: '',
      financialCapabale: undefined,
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
          name="understandResponsibility"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="understandResponsibility"
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
          Як ви плануєте вирішувати питання догляду за твариною під час
          відпусток чи відряджень?
        </h3>
        <Input
          control={control}
          name="carePlanning"
          error={errors.carePlanning}
          placeholder="Я планую..."
        />
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>
          Чи готові ви взяти тварину з особливими потребами (інвалідність,
          хронічні захворювання)?
        </h3>
        <Controller
          name="financialCapabale"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="financialCapabale"
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

'use client';

import { Button, RadioGroup } from '@/components/ui';
import {
  lifeConditionFormSchema,
  LifeConditionFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/LifeConditionForm/schema';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const LifeConditionForm = () => {
  const { forward, back } = useForwardBack();

  const { handleSubmit, control } = useForm<LifeConditionFormSchemaType>({
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
    console.log(data);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Де ви проживаєте?</h3>
        <Controller
          name="housingType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="housingType"
              options={[
                { value: 'apartment', label: 'Квартира' },
                { value: 'house', label: 'Приватний будинок' },
              ]}
              defaultValue={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>
          Чи є у вас двір або безпечне місце для вигулу?
        </h3>
        <Controller
          name="hasYard"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="hasYard"
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
          Чи дозволено у вашому житлі утримувати тварин?
        </h3>
        <Controller
          name="allowPets"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="allowPets"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
                { value: 'unsure', label: 'Не впевнений' },
              ]}
              defaultValue={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Чи є у вас інші домашні тварини</h3>
        <Controller
          name="hasOtherPets"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="hasOtherPets"
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
          Чи є в сім&apos;ї маленькі діти?
        </h3>
        <Controller
          name="hasChildren"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="hasChildren"
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

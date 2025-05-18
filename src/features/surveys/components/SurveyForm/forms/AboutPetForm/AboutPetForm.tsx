'use client';

import { Button, Select } from '@/components/ui';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import { CheckboxSection } from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/CheckBoxSection';
import {
  aboutPetFormSchema,
  AboutPetFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/schema';
import { useCheckboxArray } from '@/features/surveys/hooks/useCheckboxArray';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';

const characteristicsOptions = [
  { value: 0, title: 'Дружелюбний' },
  { value: 1, title: 'Спокійний' },
  { value: 2, title: 'Активний' },
  { value: 3, title: 'Грайливий' },
  { value: 4, title: 'Ласкавий' },
];

export const AboutPetForm = () => {
  const { saveData } = useFormData(2);
  const { forward, back } = useForwardBack();

  const petType = useCheckboxArray();
  const gender = useCheckboxArray();
  const size = useCheckboxArray();
  const age = useCheckboxArray();
  const specialNeeds = useCheckboxArray([], true);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AboutPetFormSchemaType>({
    resolver: zodResolver(aboutPetFormSchema),
    defaultValues: {
      petType: undefined,
      gender: undefined,
      size: undefined,
      age: undefined,
      hasSpecialNeeds: undefined,
      characteristics: undefined,
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    const submissionData = {
      preferredSpecies: petType.values,
      preferredSizes: size.values,
      preferredAges: age.values,
      preferredGenders: gender.values,
      desiredFeaturesIds: data.characteristics || [],
      readyForSpecialNeedsPet: specialNeeds.values.includes(1),
    };

    saveData(submissionData);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <CheckboxSection
        title="Бажана тваринка"
        name="petType"
        control={control}
        options={PetSpecies}
        values={petType.values}
        onToggle={petType.toggle}
      />

      <CheckboxSection
        title="Стать"
        name="gender"
        control={control}
        options={PetGender}
        values={gender.values}
        onToggle={gender.toggle}
      />

      <CheckboxSection
        title="Розмір"
        name="size"
        control={control}
        options={PetSize}
        values={size.values}
        onToggle={size.toggle}
      />

      <CheckboxSection
        title="Вік"
        name="age"
        control={control}
        options={PetAge}
        values={age.values}
        onToggle={age.toggle}
      />

      <CheckboxSection
        title="З особливостями?"
        name="hasSpecialNeeds"
        control={control}
        options={PetsSpecialNeeds}
        values={specialNeeds.values}
        onToggle={specialNeeds.toggle}
        transform={(value) => value === 1}
      />

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Характеристики</h3>
        <Controller
          name="characteristics"
          control={control}
          render={({ field }) => (
            <Select
              options={characteristicsOptions}
              placeholder="Характеристики"
              onChange={(value) => field.onChange(value)}
              value={field.value as number}
            />
          )}
        />
        {errors.characteristics && (
          <p className={styles.errorText}>{errors.characteristics.message}</p>
        )}
      </div>

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

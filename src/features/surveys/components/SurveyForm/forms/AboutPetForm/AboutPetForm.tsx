'use client';

import { Button } from '@/components/ui';
import { PetFeaturesSelect } from '@/features/pets/components';
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
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

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
      desiredFeaturesIds: data.characteristics ? [data.characteristics] : [],
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
        <PetFeaturesSelect control={control} />
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

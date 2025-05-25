'use client';

import { Button } from '@/components/ui';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { PetFeaturesSelect } from '@/features/pets/components';
import { PetAge, PetGender, PetSize, PetSpecies } from '@/features/pets/types';
import { CheckboxSection } from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/CheckBoxSection';
import {
  aboutPetFormSchema,
  AboutPetFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/schema';
import { RadioSection } from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm/RadioSection';
import { hasSpecialNeedsOptions } from '@/features/surveys/constants';
import { useFormData } from '@/features/surveys/hooks/useFormData';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const AboutPetForm = () => {
  const { saveData } = useFormData(2);
  const { forward, back } = useForwardBack();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<AboutPetFormSchemaType>({
    resolver: zodResolver(aboutPetFormSchema),
    defaultValues: {
      petType: [],
      gender: [],
      size: [],
      age: [],
      hasSpecialNeeds: undefined,
      characteristics: [],
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    const submissionData = {
      preferredSpecies: data.petType,
      preferredSizes: data.size,
      preferredAges: data.age,
      preferredGenders: data.gender,
      desiredFeaturesIds: data.characteristics ?? [],
      readyForSpecialNeedsPet: data.hasSpecialNeeds === 'true',
    };

    saveData(submissionData);
    forward();
  });
  const petType = watch('petType');
  const gender = watch('gender');
  const size = watch('size');
  const age = watch('age');

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <ErrorBanner errors={errors} />
      <CheckboxSection
        title="Бажана тваринка"
        name="petType"
        control={control}
        options={PetSpecies}
        values={petType}
      />

      <CheckboxSection
        title="Стать"
        name="gender"
        control={control}
        options={PetGender}
        values={gender}
      />

      <CheckboxSection
        title="Розмір"
        name="size"
        control={control}
        options={PetSize}
        values={size}
      />

      <CheckboxSection
        title="Вік"
        name="age"
        control={control}
        options={PetAge}
        values={age}
      />

      <RadioSection
        title={hasSpecialNeedsOptions.title}
        name={hasSpecialNeedsOptions.name}
        control={control}
        options={hasSpecialNeedsOptions.options}
      />

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Характеристики</h3>
        <PetFeaturesSelect control={control} />
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

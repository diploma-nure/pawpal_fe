'use client';

import { Button, Input } from '@/components/ui';
import { PetFeaturesSelect } from '@/features/pets/components';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import { useSurveyForm } from '@/features/profile/hooks/useSurveyForm';
import { CheckboxSection } from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/CheckBoxSection';
import { RadioSection } from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm/RadioSection';
import {
  experienceSection,
  lifeConditionSection,
  responsibilitySection,
} from '@/features/surveys/constants';
import { FC } from 'react';
import styles from './styles.module.scss';

export const SurveyForm: FC = () => {
  const {
    petType,
    gender,
    size,
    age,
    specialNeeds,
    control,
    onSubmit,
    errors,
  } = useSurveyForm();

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.section}>
        <h2 className="heading3">Про тваринку</h2>

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
            <p className={styles.errorText}>
              {errors.characteristics.message as string}
            </p>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className="heading3">Умови проживання</h2>

        {lifeConditionSection.map((section) => (
          <RadioSection
            key={section.name}
            title={section.title}
            name={section.name}
            control={control}
            options={section.options}
          />
        ))}
      </div>

      <div className={styles.section}>
        <h2 className="heading3">Досвід та очікування</h2>
        {experienceSection.map((section) => (
          <RadioSection
            key={section.name}
            title={section.title}
            name={section.name}
            control={control}
            options={section.options}
          />
        ))}
      </div>

      <div className={styles.section}>
        <h2 className="heading3">Відповідальність</h2>
        <RadioSection
          title={responsibilitySection[0].title}
          name={responsibilitySection[0].name}
          control={control}
          options={responsibilitySection[0].options}
        />

        <div className={styles.section__container}>
          <h3 className={styles.sectionTitle}>
            Як ви плануєте вирішувати питання догляду за твариною під час
            відпусток чи відряджень?
          </h3>
          <Input
            control={control}
            name="vacationPetCarePlan"
            error={errors.vacationPetCarePlan}
            placeholder="Я планую..."
          />
        </div>

        <RadioSection
          title={responsibilitySection[1].title}
          name={responsibilitySection[1].name}
          control={control}
          options={responsibilitySection[1].options}
        />
      </div>
      <div className={styles.formActions}>
        <Button>Зберегти анкету</Button>
      </div>
    </form>
  );
};

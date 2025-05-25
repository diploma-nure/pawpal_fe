'use client';

import { Button, Input } from '@/components/ui';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { PetFeaturesSelect } from '@/features/pets/components';
import { PetAge, PetGender, PetSize, PetSpecies } from '@/features/pets/types';
import { SuccessModal } from '@/features/profile/components/SuccessModal/SuccessModal';
import { useSurveyForm } from '@/features/profile/hooks/useSurveyForm';
import { CheckboxSection } from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/CheckBoxSection';
import { RadioSection } from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm/RadioSection';
import {
  experienceSection,
  hasSpecialNeedsOptions,
  lifeConditionSection,
  responsibilitySection,
} from '@/features/surveys/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { FC } from 'react';
import styles from './styles.module.scss';

export const SurveyForm: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { petType, gender, size, age, control, onSubmit, errors } =
    useSurveyForm(onOpen);

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <ErrorBanner errors={errors} />
        <div className={styles.section}>
          <h2 className="heading3">Про тваринку</h2>

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
      <SuccessModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

'use client';

import { Button, Icon, Input } from '@/components/ui';
import { useSurveyFormRetrive } from '@/features/admin/applications/hooks/useSurveyFormRetrieve';
import { useSurveyContactInfo } from '@/features/admin/applications/hooks/useSurveyUserContactInfo';
import { PetFeaturesSelect } from '@/features/pets/components';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import { useGetUsersInfo } from '@/features/profile/api/getUsersInfo';
import { CheckboxSection } from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/CheckBoxSection';
import { RadioSection } from '@/features/surveys/components/SurveyForm/forms/ExperienceAndExpectationsForm/RadioSection';
import {
  experienceSection,
  lifeConditionSection,
  responsibilitySection,
} from '@/features/surveys/constants';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import styles from './styles.module.scss';

export const ApplicationSurveyModule: FC = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const { data } = useGetUsersInfo({
    payload: {
      id: userId as unknown as number,
    },
  });

  const { contactControl } = useSurveyContactInfo(parseInt(userId));
  const { petType, gender, size, age, specialNeeds, control } =
    useSurveyFormRetrive(parseInt(userId));

  const { push } = useRouter();

  return (
    <>
      <div className={styles.linkContainer}>
        <Button
          className={styles.backLink}
          leftIcon={() => (
            <Icon
              name="dropdown-arrow"
              fill={colors.darkBlue}
              width={24}
              height={24}
              style={{ transform: 'rotate(180deg)' }}
            />
          )}
          onClick={() => push('/admin/applications')}
          variant="link"
        >
          Повернутись до заявок
        </Button>
      </div>

      <h2 className={clsx('heading2', styles.sectionTitle)}>
        Анкета: {data?.data.fullName}
      </h2>

      <div className={styles.application}>
        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>
            Контактна інформація
          </p>
        </div>
        <div />
        <div className={styles.section__container}>
          <Input
            control={contactControl}
            name="fullName"
            label="Прізвище ім'я"
            placeholder="Ковальчук Анна"
          />
          <Input
            control={contactControl}
            name="phoneNumber"
            label="Номер телефону"
            placeholder="+380997462594"
          />
        </div>
        <div className={styles.section__container}>
          <Input
            control={contactControl}
            name="email"
            label="Email"
            placeholder="Київ"
          />
          <Input
            control={contactControl}
            name="address"
            label="Місце проживання"
            placeholder="Київ"
          />
        </div>

        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>Про тваринку</p>
          <div className={styles.section__container}>
            <CheckboxSection
              title="Бажана тваринка"
              name="petType"
              control={control}
              options={PetSpecies}
              values={petType.values}
              onToggle={petType.toggle}
            />
          </div>

          <div className={styles.section__container}>
            <CheckboxSection
              title="Стать"
              name="gender"
              control={control}
              options={PetGender}
              values={gender.values}
              onToggle={gender.toggle}
            />
          </div>

          <div className={styles.section__container}>
            <CheckboxSection
              title="Розмір"
              name="size"
              control={control}
              options={PetSize}
              values={size.values}
              onToggle={size.toggle}
            />
          </div>

          <div className={styles.section__container}>
            <CheckboxSection
              title="Вік"
              name="age"
              control={control}
              options={PetAge}
              values={age.values}
              onToggle={age.toggle}
            />
          </div>

          <div className={styles.section__container}>
            <CheckboxSection
              title="З особливостями?"
              name="hasSpecialNeeds"
              control={control}
              options={PetsSpecialNeeds}
              values={specialNeeds.values}
              onToggle={specialNeeds.toggle}
              transform={(value) => value === 1}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>Характеристики</h3>
            <PetFeaturesSelect control={control} />
          </div>
        </div>

        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>
            Умови проживання
          </p>
          {lifeConditionSection.map((section) => (
            <div key={section.name} className={styles.section__container}>
              <RadioSection
                title={section.title}
                name={section.name}
                control={control}
                options={section.options}
              />
            </div>
          ))}
        </div>

        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>
            Досвід та очікування
          </p>
          {experienceSection.map((section) => (
            <div key={section.name} className={styles.section__container}>
              <RadioSection
                key={section.name}
                title={section.title}
                name={section.name}
                control={control}
                options={section.options}
              />
            </div>
          ))}
        </div>

        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>
            Відповідальність
          </p>
          <div className={styles.section__container}>
            <RadioSection
              title={responsibilitySection[0].title}
              name={responsibilitySection[0].name}
              control={control}
              options={responsibilitySection[0].options}
            />
            <div />

            <div className={styles.section__container}>
              <h3 className={styles.inputTitle}>
                Як ви плануєте вирішувати питання догляду за твариною під час
                відпусток чи відряджень?
              </h3>
              <Input
                control={control}
                name="vacationPetCarePlan"
                placeholder="Я планую..."
              />
            </div>

            <div className={styles.section__container}>
              <RadioSection
                title={responsibilitySection[1].title}
                name={responsibilitySection[1].name}
                control={control}
                options={responsibilitySection[1].options}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

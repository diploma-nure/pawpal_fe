'use client';

import {
  Button,
  Checkbox,
  Icon,
  Input,
  RadioGroup,
  Select,
} from '@/components/ui';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const ApplicationSurveyModule: FC = () => {
  const { push } = useRouter();

  const { control } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      location: '',
    },
  });

  const characteristicsOptions = [
    { value: 0, title: 'Дружелюбний' },
    { value: 1, title: 'Спокійний' },
    { value: 2, title: 'Активний' },
    { value: 3, title: 'Грайливий' },
    { value: 4, title: 'Ласкавий' },
  ];

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
        Анкета: Аліна Світоліна
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
            control={control}
            name="fullName"
            label="Прізвище ім'я"
            placeholder="Ковальчук Анна"
          />
          <Input
            control={control}
            name="phone"
            label="Номер телефону"
            placeholder="+380997462594"
          />
        </div>
        <div className={styles.section__container}>
          <Input
            control={control}
            name="email"
            label="Email"
            placeholder="Київ"
          />
          <Input
            control={control}
            name="location"
            label="Місце проживання"
            placeholder="Київ"
          />
        </div>

        <div>
          <div className={styles.section__container}>
            <p className={clsx('heading3', styles.sectionTitle)}>
              Про тваринку
            </p>
            <h3 className={styles.inputTitle}>Бажана тваринка</h3>
            <div className={styles.checkboxGroup}>
              <Checkbox option="cat" content="Кіт" checked />
              <Checkbox option="dog" content="Собака" checked />
            </div>
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>Стать</h3>
            <div className={styles.checkboxGroup}>
              <Checkbox option="male" content="Хлопчик" checked />
              <Checkbox option="female" content="Дівчинка" checked />
            </div>
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>Розмір</h3>
            <div className={styles.checkboxGroup}>
              <Checkbox option="small" content="Маленький (до 30 см)" checked />
              <Checkbox
                option="medium"
                content="Середній (30 - 50 см)"
                checked
              />
              <Checkbox option="large" content="Великий (від 50 см)" checked />
            </div>
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>Вік</h3>
            <div className={styles.checkboxGroup}>
              <Checkbox option="under1" content="До 1 року" checked />
              <Checkbox option="1to5" content="1 - 5 рік" checked />
              <Checkbox option="over5" content="5 і більше років" checked />
            </div>
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>З особливостями?</h3>
            <div className={styles.checkboxGroup}>
              <Checkbox option="yes" content="Так" checked />
              <Checkbox option="no" content="Ні" checked />
            </div>
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>Характеристики</h3>
            <Select
              value={characteristicsOptions[0].value}
              options={characteristicsOptions}
              placeholder="Характеристики"
              onChange={() => {}}
            />
          </div>
        </div>

        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>
            Умови проживання
          </p>
          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>Де ви проживаєте?</h3>

            <RadioGroup
              name="housingType"
              options={[
                { value: 'apartment', label: 'Квартира' },
                { value: 'house', label: 'Приватний будинок' },
              ]}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи є у вас двір або безпечне місце для вигулу?
            </h3>

            <RadioGroup
              name="hasYard"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи дозволено у вашому житлі утримувати тварин?
            </h3>

            <RadioGroup
              name="allowPets"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
                { value: 'unsure', label: 'Не впевнений' },
              ]}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи є у вас інші домашні тварини
            </h3>

            <RadioGroup
              name="hasOtherPets"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи є в сім&apos;ї маленькі діти?
            </h3>

            <RadioGroup
              name="hasChildren"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
            />
          </div>
        </div>

        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>
            Досвід та очікування
          </p>
          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи були у вас домашні тварини раніше?
            </h3>

            <RadioGroup
              name="hadPetsBefore"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Який рівень активності вам підходить?
            </h3>

            <RadioGroup
              name="activityLevel"
              options={[
                { value: 'calm', label: 'Спокійний' },
                { value: 'moderate', label: 'Помірно активний' },
                { value: 'active', label: 'Активний' },
              ]}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи готові ви взяти тварину з особливими потребами (інвалідність,
              хронічні захворювання)?
            </h3>

            <RadioGroup
              name="willingToAdoptSpecialNeeds"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
            />
          </div>
        </div>

        <div>
          <p className={clsx('heading3', styles.sectionTitle)}>
            Відповідальність
          </p>
          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи були у вас домашні тварини раніше?
            </h3>

            <RadioGroup
              name="understandResponsibility"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Як ви плануєте вирішувати питання догляду за твариною під час
              відпусток чи відряджень?
            </h3>
            <Input
              control={control}
              name="carePlanning"
              placeholder="Я планую..."
            />
          </div>

          <div className={styles.section__container}>
            <h3 className={styles.inputTitle}>
              Чи готові ви взяти тварину з особливими потребами (інвалідність,
              хронічні захворювання)?
            </h3>

            <RadioGroup
              name="financialCapabale"
              options={[
                { value: 'yes', label: 'Так' },
                { value: 'no', label: 'Ні' },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

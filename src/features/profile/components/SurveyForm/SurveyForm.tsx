'use client';

import { Button, Checkbox, Input, RadioGroup, Select } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SurveyFormSchema, surveySchema } from './schema';
import styles from './styles.module.scss';

export const SurveyForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SurveyFormSchema>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      homeType: '',
      hasSafePlace: false,
      petsAllowed: false,
      hasOtherPets: false,
      hasChildren: false,
      hadPetsBefore: false,
      activityLevel: '',
      petType: '',
      petSize: null,
      petAge: null,
      petGender: '',
      petWithSpecialNeeds: false,
      petCharacteristics: null,
      responsibilityAgreement: false,
      emergencyPlanDescription: '',
      canProvideFinancialSupport: false,
    },
  });

  const onSubmit = (data: SurveyFormSchema) => {
    console.log(data);
    // Here will be the API call to submit survey data
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Про тваринку</h2>

        <div className={styles.question}>
          <p className={styles.questionText}>Бажана тваринка</p>
          <Controller
            name="petType"
            control={control}
            render={({ field }) => (
              <div className={styles.checkboxGroup}>
                <Checkbox
                  option="dog"
                  content="Собака"
                  checked={field.value === 'dog'}
                  toggleOption={() => field.onChange('dog')}
                />
                <Checkbox
                  option="cat"
                  content="Кіт"
                  checked={field.value === 'cat'}
                  toggleOption={() => field.onChange('cat')}
                />
              </div>
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>Розмір</p>
          <Controller
            name="petSize"
            control={control}
            render={({ field }) => (
              <div className={styles.checkboxGroup}>
                <Checkbox
                  option="small"
                  content="Маленький (до 30 см)"
                  checked={field.value === 1}
                  toggleOption={() => field.onChange(1)}
                />
                <Checkbox
                  option="medium"
                  content="Середній (30 - 50 см)"
                  checked={field.value === 2}
                  toggleOption={() => field.onChange(2)}
                />
                <Checkbox
                  option="large"
                  content="Великий (від 50 см)"
                  checked={field.value === 3}
                  toggleOption={() => field.onChange(3)}
                />
              </div>
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>Вік</p>
          <Controller
            name="petAge"
            control={control}
            render={({ field }) => (
              <div className={styles.checkboxGroup}>
                <Checkbox
                  option="young"
                  content="До 1 року"
                  checked={field.value === 1}
                  toggleOption={() => field.onChange(1)}
                />
                <Checkbox
                  option="adult"
                  content="1 - 5 рік"
                  checked={field.value === 2}
                  toggleOption={() => field.onChange(2)}
                />
                <Checkbox
                  option="senior"
                  content="5 і більше років"
                  checked={field.value === 3}
                  toggleOption={() => field.onChange(3)}
                />
              </div>
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>Стать</p>
          <Controller
            name="petGender"
            control={control}
            render={({ field }) => (
              <div className={styles.checkboxGroup}>
                <Checkbox
                  option="male"
                  content="Хлопчик"
                  checked={field.value === 'male'}
                  toggleOption={() => field.onChange('male')}
                />
                <Checkbox
                  option="female"
                  content="Дівчинка"
                  checked={field.value === 'female'}
                  toggleOption={() => field.onChange('female')}
                />
              </div>
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>З особливостями?</p>
          <Controller
            name="petWithSpecialNeeds"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="petWithSpecialNeeds"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                ]}
                defaultValue={field.value ? 'true' : 'false'}
                onChange={(value) => field.onChange(value === 'true')}
              />
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>Характеристики</p>
          <Controller
            name="petCharacteristics"
            control={control}
            render={({ field }) => (
              <Select
                options={[
                  { value: 0, title: 'Ладнає з іншими тваринами' },
                  { value: 1, title: 'Не лааднає з іншими тваринами' },
                ]}
                placeholder="Оберіть характеристики"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Умови проживання</h2>

        <div className={styles.question}>
          <p className={styles.questionText}>Де ви проживаєте?</p>
          <Controller
            name="homeType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="homeType"
                options={[
                  { value: 'apartment', label: 'Квартира' },
                  { value: 'house', label: 'Приватний будинок' },
                ]}
                defaultValue={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Чи є у вас двір або безпечне місце для вигулу?
          </p>
          <Controller
            name="hasSafePlace"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="hasSafePlace"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                ]}
                defaultValue={field.value ? 'true' : 'false'}
                onChange={(value) => field.onChange(value === 'true')}
              />
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Чи дозволено у вашому житлі утримувати тварин?
          </p>
          <Controller
            name="petsAllowed"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="petsAllowed"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                  { value: 'unknown', label: 'Не впевнений' },
                ]}
                defaultValue={
                  field.value === true
                    ? 'true'
                    : field.value === false
                      ? 'false'
                      : 'unknown'
                }
                onChange={(value) =>
                  field.onChange(
                    value === 'true' ? true : value === 'false' ? false : null,
                  )
                }
              />
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Чи є у вас інші домашні тварини?
          </p>
          <Controller
            name="hasOtherPets"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="hasOtherPets"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                ]}
                defaultValue={field.value ? 'true' : 'false'}
                onChange={(value) => field.onChange(value === 'true')}
              />
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Чи є в сім&apos;ї маленькі діти?
          </p>
          <Controller
            name="hasChildren"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="hasChildren"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                ]}
                defaultValue={field.value ? 'true' : 'false'}
                onChange={(value) => field.onChange(value === 'true')}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Досвід та очікування</h2>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Чи були у вас домашні тварини раніше?
          </p>
          <Controller
            name="hadPetsBefore"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="hadPetsBefore"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                ]}
                defaultValue={field.value ? 'true' : 'false'}
                onChange={(value) => field.onChange(value === 'true')}
              />
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Який рівень активності вам підходить?
          </p>
          <Controller
            name="activityLevel"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="activityLevel"
                options={[
                  { value: 'low', label: 'Спокійний' },
                  { value: 'medium', label: 'Помірно активний' },
                  { value: 'high', label: 'Активний' },
                ]}
                defaultValue={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Відповідальність</h2>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Ви розумієте, що тваринка — це довготривала відповідальність?
          </p>
          <Controller
            name="responsibilityAgreement"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="responsibilityAgreement"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                ]}
                defaultValue={field.value ? 'true' : 'false'}
                onChange={(value) => field.onChange(value === 'true')}
              />
            )}
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Як ви плануєте вирішувати питання догляду за тваринкою під час
            відпустки чи відрядження?
          </p>
          <Input
            name="emergencyPlanDescription"
            control={control}
            error={errors.emergencyPlanDescription}
            placeholder="Я планую..."
          />
        </div>

        <div className={styles.question}>
          <p className={styles.questionText}>
            Чи маєте ви фінансову можливість забезпечувати тварину (харчування,
            ветеринарний догляд тощо)
          </p>
          <Controller
            name="canProvideFinancialSupport"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="canProvideFinancialSupport"
                options={[
                  { value: 'true', label: 'Так' },
                  { value: 'false', label: 'Ні' },
                ]}
                defaultValue={field.value ? 'true' : 'false'}
                onChange={(value) => field.onChange(value === 'true')}
              />
            )}
          />
        </div>
      </div>
      <div className={styles.formActions}>
        <Button type="submit">Зберегти анкету</Button>
      </div>
    </form>
  );
};

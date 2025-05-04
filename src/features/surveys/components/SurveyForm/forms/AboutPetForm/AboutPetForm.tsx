'use client';

import { Button, Checkbox, Select } from '@/components/ui';
import {
  aboutPetFormSchema,
  AboutPetFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/schema';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const AboutPetForm = () => {
  const [petType, setPetType] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);
  const [specialNeeds, setSpecialNeeds] = useState<string[]>([]);

  const { forward, back } = useForwardBack();

  const {
    handleSubmit,
    control,
    formState: { errors },
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
    console.log(data, errors);
    forward();
  });

  const togglePetType = (option: string) => {
    if (petType.includes(option)) {
      setPetType(petType.filter((item) => item !== option));
    } else {
      setPetType([
        ...petType.filter((item) => item !== 'cat' && item !== 'dog'),
        option,
      ]);
    }
  };

  const toggleGender = (option: string) => {
    if (gender.includes(option)) {
      setGender(gender.filter((item) => item !== option));
    } else {
      setGender([
        ...gender.filter((item) => item !== 'male' && item !== 'female'),
        option,
      ]);
    }
  };

  const toggleSize = (option: string) => {
    if (size.includes(option)) {
      setSize(size.filter((item) => item !== option));
    } else {
      setSize([
        ...size.filter(
          (item) => item !== 'small' && item !== 'medium' && item !== 'large',
        ),
        option,
      ]);
    }
  };

  const toggleAge = (option: string) => {
    if (age.includes(option)) {
      setAge(age.filter((item) => item !== option));
    } else {
      setAge([
        ...age.filter(
          (item) => item !== 'under1' && item !== '1to5' && item !== 'over5',
        ),
        option,
      ]);
    }
  };

  const toggleSpecialNeeds = (option: string) => {
    if (specialNeeds.includes(option)) {
      setSpecialNeeds(specialNeeds.filter((item) => item !== option));
    } else {
      setSpecialNeeds([
        ...specialNeeds.filter((item) => item !== 'yes' && item !== 'no'),
        option,
      ]);
    }
  };

  const characteristicsOptions = [
    { value: 0, title: 'Дружелюбний' },
    { value: 1, title: 'Спокійний' },
    { value: 2, title: 'Активний' },
    { value: 3, title: 'Грайливий' },
    { value: 4, title: 'Ласкавий' },
  ];

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Бажана тваринка</h3>
        <div className={styles.checkboxGroup}>
          <Controller
            name="petType"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  option="cat"
                  content="Кіт"
                  checked={petType.includes('cat')}
                  toggleOption={(option) => {
                    togglePetType(option);
                    field.onChange('cat');
                  }}
                />
                <Checkbox
                  option="dog"
                  content="Собака"
                  checked={petType.includes('dog')}
                  toggleOption={(option) => {
                    togglePetType(option);
                    field.onChange('dog');
                  }}
                />
              </>
            )}
          />
        </div>
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Стать</h3>
        <div className={styles.checkboxGroup}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  option="male"
                  content="Хлопчик"
                  checked={gender.includes('male')}
                  toggleOption={(option) => {
                    toggleGender(option);
                    field.onChange('male');
                  }}
                />
                <Checkbox
                  option="female"
                  content="Дівчинка"
                  checked={gender.includes('female')}
                  toggleOption={(option) => {
                    toggleGender(option);
                    field.onChange('female');
                  }}
                />
              </>
            )}
          />
        </div>
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Розмір</h3>
        <div className={styles.checkboxGroup}>
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  option="small"
                  content="Маленький (до 30 см)"
                  checked={size.includes('small')}
                  toggleOption={(option) => {
                    toggleSize(option);
                    field.onChange('small');
                  }}
                />
                <Checkbox
                  option="medium"
                  content="Середній (30 - 50 см)"
                  checked={size.includes('medium')}
                  toggleOption={(option) => {
                    toggleSize(option);
                    field.onChange('medium');
                  }}
                />
                <Checkbox
                  option="large"
                  content="Великий (від 50 см)"
                  checked={size.includes('large')}
                  toggleOption={(option) => {
                    toggleSize(option);
                    field.onChange('large');
                  }}
                />
              </>
            )}
          />
        </div>
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>Вік</h3>
        <div className={styles.checkboxGroup}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  option="under1"
                  content="До 1 року"
                  checked={age.includes('under1')}
                  toggleOption={(option) => {
                    toggleAge(option);
                    field.onChange('under1');
                  }}
                />
                <Checkbox
                  option="1to5"
                  content="1 - 5 рік"
                  checked={age.includes('1to5')}
                  toggleOption={(option) => {
                    toggleAge(option);
                    field.onChange('1to5');
                  }}
                />
                <Checkbox
                  option="over5"
                  content="5 і більше років"
                  checked={age.includes('over5')}
                  toggleOption={(option) => {
                    toggleAge(option);
                    field.onChange('over5');
                  }}
                />
              </>
            )}
          />
        </div>
      </div>

      <div className={styles.section__container}>
        <h3 className={styles.sectionTitle}>З особливостями?</h3>
        <div className={styles.checkboxGroup}>
          <Controller
            name="hasSpecialNeeds"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  option="yes"
                  content="Так"
                  checked={specialNeeds.includes('yes')}
                  toggleOption={(option) => {
                    toggleSpecialNeeds(option);
                    field.onChange('yes');
                  }}
                />
                <Checkbox
                  option="no"
                  content="Ні"
                  checked={specialNeeds.includes('no')}
                  toggleOption={(option) => {
                    toggleSpecialNeeds(option);
                    field.onChange('no');
                  }}
                />
              </>
            )}
          />
        </div>
      </div>

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
              value={field.value}
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

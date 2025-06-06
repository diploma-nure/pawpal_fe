/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from '@/components/ui';
import { AboutPetFormSchemaType } from '@/features/surveys/components/SurveyForm/forms/AboutPetForm/schema';
import { Control, Controller } from 'react-hook-form';
import styles from './styles.module.scss';

interface CheckboxSectionProps {
  title: string;
  name: keyof AboutPetFormSchemaType;
  control: Control<any>;
  options: Array<{ title: string; value: number }>;
  values: number[];
  transform?: (value: number) => any;
}

export const CheckboxSection = ({
  title,
  name,
  control,
  options,
  values,
  transform = (value) => value,
}: CheckboxSectionProps) => {
  return (
    <div className={styles.section__container}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.checkboxGroup}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  option={option.value.toString()}
                  content={option.title}
                  checked={values?.includes(option.value)}
                  toggleOption={() => {
                    field.onChange(
                      values?.includes(option.value)
                        ? values.filter((v: number) => v !== option.value)
                        : [...values, transform(option.value)],
                    );
                  }}
                />
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
};

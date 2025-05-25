import { RadioGroup } from '@/components/ui';
import { Control, Controller } from 'react-hook-form';
import styles from './styles.module.scss';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioSectionProps {
  title: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  options: RadioOption[];
}

export const RadioSection = ({
  title,
  name,
  control,
  options,
}: RadioSectionProps) => {
  return (
    <div className={styles.section__container}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            name={name}
            options={options}
            defaultValue={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </div>
  );
};

'use client';

import { ChangeEvent, FC, useState } from 'react';
import styles from './styles.module.scss';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || '',
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles['radio-button-container']}>
      {options.map((option) => (
        <label key={option.value} className={styles['radio-option']}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
          />
          <p className={styles['radio-custom']} />
          <p className={styles['radio-label']}>{option.label}</p>
        </label>
      ))}
    </div>
  );
};

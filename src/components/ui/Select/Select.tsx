'use client';

import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { useClickOutside } from '@/hooks';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface SelectProps {
  placeholder?: string;
  value: number | number[] | null;
  options: { title: string; value: number }[];
  onChange: (value: number | number[]) => void;
  multiselect?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  placeholder = 'Сортувати за',
  options,
  value,
  onChange,
  multiselect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  const toggleDropdown = () => setIsOpen(!isOpen);

  const onSelect = (selectedValue: number) => {
    if (multiselect) {
      let newValue: number[] = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(selectedValue)) {
        newValue = newValue.filter((v) => v !== selectedValue);
      } else {
        newValue.push(selectedValue);
      }
      onChange(newValue);
    } else {
      onChange(selectedValue);
      setIsOpen(false);
    }
  };

  const getSelectedTitles = () => {
    if (multiselect && Array.isArray(value)) {
      const selectedOptions = options.filter((item) =>
        value.includes(item.value),
      );
      return selectedOptions.length > 0
        ? selectedOptions.map((item) => item.title).join(', ')
        : placeholder;
    }
    return options.find((item) => item.value === value)?.title ?? placeholder;
  };

  return (
    <div ref={ref} className={styles.multiSelectWrapper}>
      <div className={styles.selectHeader} onClick={toggleDropdown}>
        <p className={styles.selectedOption}>{getSelectedTitles()}</p>
        <span className={styles.arrow}></span>
      </div>

      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((option) => {
            const checked = multiselect
              ? Array.isArray(value) && value.includes(option.value)
              : value === option.value;
            return (
              // <div key={option.value} onClick={() => onSelect(option.value)}>
              <Checkbox
                key={option.value}
                option={option.title}
                checked={checked}
                content={option.title}
                toggleOption={() => onSelect(option.value)}
              />
              // </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

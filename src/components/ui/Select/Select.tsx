'use client';

import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { useClickOutside } from '@/hooks';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface SelectProps {
  placeholder?: string;
  value: number | null;
  options: { title: string; value: number }[];
  onChange: (value: number) => void;
}

export const Select: React.FC<SelectProps> = ({
  placeholder = 'Сортувати за',
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  const toggleDropdown = () => setIsOpen(!isOpen);

  const onSelect = (value: number) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={styles.multiSelectWrapper}>
      <div className={styles.selectHeader} onClick={toggleDropdown}>
        <p className={styles.selectedOption}>
          {options.find((item) => item.value === value)?.title ?? placeholder}
        </p>
        <span className={styles.arrow}></span>
      </div>

      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((option) => {
            return (
              <div key={option.value} onClick={() => onSelect(option.value)}>
                <Checkbox
                  option={option.title}
                  checked={
                    value === option.value ||
                    (value as unknown as number[])?.includes(option.value)
                  }
                  content={option.title}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

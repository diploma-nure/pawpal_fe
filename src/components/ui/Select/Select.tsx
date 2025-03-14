'use client';

import { Checkbox } from '@/components/ui';
import { useClickOutside } from '@/hooks';
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface MultiSelectProps {
  options: string[];
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Сортувати за',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  return (
    <div ref={ref} className={styles.multiSelectWrapper}>
      <div className={styles.selectHeader} onClick={toggleDropdown}>
        <p className={styles.selectedOption}>
          {selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : placeholder}
        </p>
        <span className={styles.arrow}></span>
      </div>

      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((option) => {
            console.log(option);
            return (
              <Checkbox
                key={option}
                option={option}
                checked={selectedOptions.includes(option)}
                toggleOption={handleOptionToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

'use client';

import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { useClickOutside } from '@/hooks/useClickOutside';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';

interface SelectProps {
  placeholder?: string;
  value: number | number[] | null;
  options: { title: string; value: number }[];
  onChange: (value: number | number[]) => void;
  multiselect?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  placeholder = 'Сортувати за',
  options,
  value,
  onChange,
  multiselect = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>(
    'bottom',
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const clickOutsideRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  // Combine refs using callback
  const setRefs = (node: HTMLDivElement | null) => {
    // Use type assertion to bypass readonly
    (selectRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (clickOutsideRef as React.MutableRefObject<HTMLDivElement | null>).current =
      node;
  };
  const toggleDropdown = () => {
    if (!isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = Math.min(300, options.length * 60);

      if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
        setDropdownPosition('bottom');
      } else {
        setDropdownPosition('top');
      }
    }
    setIsOpen(!isOpen);
  };

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
    <div ref={setRefs} className={clsx(styles.multiSelectWrapper, className)}>
      <div className={styles.selectHeader} onClick={toggleDropdown}>
        <p className={styles.selectedOption}>{getSelectedTitles()}</p>
        <span className={styles.arrow}></span>
      </div>

      {isOpen && (
        <div
          className={clsx(
            styles.optionsList,
            dropdownPosition === 'top' && styles.optionsListTop,
          )}
        >
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

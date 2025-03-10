'use client';

import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  option: string;
  checked: boolean;
  toggleOption: (option: string) => void;
};

export const Checkbox: FC<Props> = ({ option, checked, toggleOption }) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleOption(option)}
      />
      <p className={styles.checkboxText}>{option}</p>
    </label>
  );
};

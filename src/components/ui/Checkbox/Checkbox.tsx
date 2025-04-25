'use client';

import clsx from 'clsx';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  option: string;
  content: string;
  contentClassname?: string;
  checked: boolean;
  toggleOption: (option: string) => void;
};

export const Checkbox: FC<Props> = ({
  option,
  checked,
  toggleOption,
  content,
  contentClassname,
}) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggleOption(option)}
      />
      <p className={clsx(styles.checkboxText, contentClassname)}>{content}</p>
    </label>
  );
};

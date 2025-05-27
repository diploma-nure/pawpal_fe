'use client';

import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

export type TagVariant = 'gender' | 'age' | 'size' | 'specialNeeds';

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

export const Tag: FC<TagProps> = ({ children, variant, className }) => {
  return (
    <div
      className={clsx(
        styles.tag,
        variant && styles[`tag_${variant}`],
        className,
      )}
    >
      {children}
    </div>
  );
};

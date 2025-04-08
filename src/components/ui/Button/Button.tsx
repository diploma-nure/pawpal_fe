'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { ButtonColor, ButtonSize, ButtonVariant } from './Button.typedefs';
import styles from './styles.module.scss';

type Props = {
  leftIcon?: () => JSX.Element;
  rightIcon?: () => JSX.Element;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  variant = 'filled',
  color = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${color}_${variant}`],
        styles[`button_${size}`],
        className,
      )}
      {...props}
    >
      {leftIcon && <span className={styles.leftIcon}>{leftIcon()}</span>}

      {children}

      {rightIcon && <span className={styles.rightIcon}>{rightIcon()}</span>}
    </button>
  );
};

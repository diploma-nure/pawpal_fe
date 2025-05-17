/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import clsx from 'clsx';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import styles from './styles.module.scss';

type InputProps = {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  type?: string;
  classNames?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FC<InputProps> = ({
  name,
  control,
  label,
  error,
  type = 'text',
  classNames,
  ...rest
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <p className={styles.label}>{label}</p>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              {...field}
              placeholder="example@gmail.com"
              className={clsx(
                styles.input,
                { [styles.error]: error },
                classNames,
              )}
              type={type}
              {...rest}
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

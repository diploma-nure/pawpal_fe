/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import styles from './styles.module.scss';

type InputProps = {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  type?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FC<InputProps> = ({
  name,
  control,
  label,
  error,
  type = 'text',
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
              className={`${styles.input} ${error ? styles.error : ''}`}
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

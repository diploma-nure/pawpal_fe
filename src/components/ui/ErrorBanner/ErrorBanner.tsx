/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { FieldErrors } from 'react-hook-form';
import styles from './styles.module.scss';

interface ErrorBannerProps {
  errors: FieldErrors<any>;
}

export const ErrorBanner: FC<ErrorBannerProps> = ({ errors }) => {
  const getErrorMessages = (errorsObj: FieldErrors<any>): string[] => {
    const messages: string[] = [];

    const extractMessages = (obj: any, prefix = '') => {
      Object.keys(obj).forEach((key) => {
        const error = obj[key];
        const fieldPath = prefix ? `${prefix}.${key}` : key;

        if (error?.message) {
          messages.push(`${error.message}`);
        } else if (error && typeof error === 'object' && !error.message) {
          extractMessages(error, fieldPath);
        }
      });
    };

    extractMessages(errorsObj);
    return messages;
  };

  const errorMessages = getErrorMessages(errors);

  if (errorMessages.length === 0) {
    return null;
  }

  return (
    <div className={styles.errorBanner}>
      <div className={styles.errorContent}>
        <h3 className={styles.errorTitle}>Ой, халепа, виправте наступне:</h3>
        <ul className={styles.errorList}>
          {errorMessages.map((message, index) => (
            <li key={index} className={styles.errorItem}>
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

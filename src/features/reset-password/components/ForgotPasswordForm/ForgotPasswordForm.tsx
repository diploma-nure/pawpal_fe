'use client';
import { Button, Icon, Input } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ForgotPasswordSchemaType, forgotPasswordSchema } from './schema';
import styles from './styles.module.scss';

export const ForgotPasswordForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onForgotPassword = handleSubmit((data: ForgotPasswordSchemaType) => {
    console.log('Submitted Data:', data);
  });

  return (
    <form onSubmit={onForgotPassword} className={styles.form}>
      <Icon name="logo" width={92} height={78} />
      <h3 className="heading3">Забули пароль?</h3>
      <p className={styles.text}>
        Просто введіть свою пошту — ми надішлемо інструкції для створення нового
        пароля
      </p>

      <div className={styles.inputWrapper}>
        <Input
          name="email"
          control={control}
          label="E-mail"
          error={errors.email}
          type="text"
        />
        <Button className={styles.sendLetter} variant="link">
          Відправити лист ще раз
        </Button>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          variant="outline"
          style={{ flexShrink: 2 }}
        >
          Повернутись
        </Button>

        <Button
          className={styles.button}
          variant="filled"
          style={{ flexShrink: 1 }}
        >
          Відновити пароль
        </Button>
      </div>
    </form>
  );
};

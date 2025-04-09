'use client';
import { Button, Icon, Input } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { NewPasswordSchemaType, newPasswordSchema } from './schema';
import styles from './styles.module.scss';

export const NewPasswordForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onNewPassword = handleSubmit((data: NewPasswordSchemaType) => {
    console.log('Submitted Data:', data);
  });

  return (
    <form onSubmit={onNewPassword} className={styles.form}>
      <Icon name="logo" width={92} height={78} />
      <h3 className="heading3">Відновлення паролю</h3>

      <div className={styles.inputWrapper}>
        <Input
          name="password"
          control={control}
          label="Новий пароль"
          error={errors.password}
          type="password"
        />

        <Input
          name="confirmPassword"
          control={control}
          label="Підтвердіть пароль"
          error={errors.confirmPassword}
          type="password"
        />
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
          Зберегти новий пароль
        </Button>
      </div>
    </form>
  );
};

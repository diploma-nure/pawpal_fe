'use client';
import { Button, Icon, Input } from '@/components/ui';
import { colors } from '@/styles/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpSchemaType, signUpSchema } from './schema';
import styles from './styles.module.scss';

export const SignUpForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSignUp = handleSubmit((data: SignUpSchemaType) => {
    console.log('Submitted Data:', data);
  });

  return (
    <form onSubmit={onSignUp} className={styles.form}>
      <Icon name="logo" width={92} height={78} />
      <h3 className="heading3">Ласкаво просимо до PawPal</h3>
      <p className={styles.text}>
        Щоб продовжити увійдіть або зареєструйтесь до системи
      </p>

      <Input
        name="email"
        control={control}
        label="E-mail"
        error={errors.email}
        type="text"
      />
      <Input
        name="password"
        control={control}
        label="Пароль"
        error={errors.password}
        placeholder="********"
        type="password"
      />

      <div className={styles.buttonContainer}>
        <Button className={styles.button} variant="filled">
          Увійти
        </Button>
      </div>

      <p className={styles.text}>або</p>

      <div className={styles.buttonContainer}>
        <Button
          variant="outline"
          className={styles.button}
          leftIcon={() => <Icon name="Google" fill={colors.orange} />}
        >
          Продовжити з Google
        </Button>
      </div>
    </form>
  );
};

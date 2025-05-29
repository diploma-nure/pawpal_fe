'use client';
import { Button, Icon, Input } from '@/components/ui';
import { colors } from '@/styles/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../api/login';
import { SignUpSchemaType, signUpSchema } from './schema';
import styles from './styles.module.scss';

export const SignUpForm: FC = () => {
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignUp = handleSubmit(async (data: SignUpSchemaType) => {
    const response = await login({
      email: data.email,
      password: data.password,
    });

    if (!response?.data.token) {
      return;
    }

    if (response?.data.token) {
      Cookies.set('token', response.data.token);
    }

    if (response?.data.isNewUser) {
      push('/survey');
    } else {
      push('/');
    }
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

      <div className={styles.inputWrapper}>
        <Input
          name="password"
          control={control}
          label="Пароль"
          error={errors.password}
          placeholder="********"
          type="password"
        />
        <Button
          type="button"
          variant="link"
          onClick={() => push('/reset-password')}
        >
          Забули пароль?
        </Button>
      </div>

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
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Продовжити з Google
        </Button>
      </div>
    </form>
  );
};

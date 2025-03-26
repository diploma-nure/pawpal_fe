'use client';
import { Button, Icon } from '@/components/ui';
import { colors } from '@/styles/colors';
import { FC } from 'react';

export const SignUpForm: FC = () => {
  return (
    <div>
      <Icon name="logo" width={92} height={78} />
      <h3>Ласкаво просимо до PawPal</h3>
      <p>Щоб продовжити увійдіть або зареєструйтесь до системи</p>

      <input type="text" placeholder="Ім'я" />
      <input type="text" placeholder="Ім'я" />

      <Button>Увійти</Button>
      <p>або</p>
      <Button
        variant="outline"
        leftIcon={() => <Icon name="Google" fill={colors.orange} />}
      >
        Продовжити з Google
      </Button>
    </div>
  );
};

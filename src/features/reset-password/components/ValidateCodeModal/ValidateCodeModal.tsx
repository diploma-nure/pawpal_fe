'use client';

import { Button, Input, Modal } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { validateCode } from '../../api/validateCode';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ValidateCodeModal: FC<Props> = ({ isOpen, onClose }) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: '',
    },
  });
  const onSubmit = handleSubmit(async (data: { code: string }) => {
    try {
      const userId = searchParams.get('userId');
      const response = await validateCode({
        userId: Number(userId) ?? 0,
        recoveryCode: data.code,
      });

      if (response) {
        push(
          '/reset-password/new-password' +
            `?userId=${userId}&code=${data.code}`,
        );
      }
    } catch (error) {
      console.error('Error validating code:', error);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className={styles.text}>
        Ми надіслали код на вашу електронну пошту. Перевірте вхідні повідомлення
        та введіть код нижче
      </p>

      <form className={styles.formWrapper} onSubmit={onSubmit}>
        <Input
          name="code"
          control={control}
          label="Код"
          placeholder="123456"
          error={errors.code}
          type="text"
        />
        <Button>Продовжити</Button>
      </form>
    </Modal>
  );
};

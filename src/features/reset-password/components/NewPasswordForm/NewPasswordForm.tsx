'use client';
import { Button, Icon, Input } from '@/components/ui';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { useDisclosure } from '@/hooks/useDisclosure';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { changePassword } from '../../api/changePassword';
import { ConfirmPasswordChangeModal } from '../ConfirmPasswordChangeModal/ConfirmPasswordChangeModal';
import { NewPasswordSchemaType, newPasswordSchema } from './schema';
import styles from './styles.module.scss';

export const NewPasswordForm: FC = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

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

  const onNewPassword = handleSubmit(async (data: NewPasswordSchemaType) => {
    const userId = searchParams.get('userId');
    const code = searchParams.get('code');

    try {
      const response = await changePassword({
        userId: Number(userId) ?? 0,
        recoveryCode: code ?? '',
        newPassword1: data.password,
        newPassword2: data.confirmPassword,
      });

      if (response) {
        onOpen();
      }
    } catch (error) {
      console.error('Error validating code:', error);
    }
  });

  const handleClose = () => {
    onClose();
    push('/log-in');
  };

  return (
    <>
      <form onSubmit={onNewPassword} className={styles.form}>
        <Icon name="logo" width={92} height={78} />
        <h3 className="heading3">Відновлення паролю</h3>

        <ErrorBanner errors={errors} />
        <div className={styles.inputWrapper}>
          <Input
            name="password"
            control={control}
            label="Новий пароль"
            error={errors.password}
            type="password"
            placeholder="********"
          />

          <Input
            name="confirmPassword"
            control={control}
            label="Підтвердіть пароль"
            error={errors.confirmPassword}
            type="password"
            placeholder="********"
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

      <ConfirmPasswordChangeModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

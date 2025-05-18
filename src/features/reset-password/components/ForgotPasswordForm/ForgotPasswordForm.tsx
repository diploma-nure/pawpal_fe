'use client';
import { Button, Icon, Input } from '@/components/ui';
import { useDisclosure } from '@/hooks/useDisclosure';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendCode } from '../../api/sendCode';
import { ValidateCodeModal } from '../ValidateCodeModal/ValidateCodeModal';
import { ForgotPasswordSchemaType, forgotPasswordSchema } from './schema';
import styles from './styles.module.scss';

export const ForgotPasswordForm: FC = () => {
  const pathname = usePathname();
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
  const { back, push } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onForgotPassword = handleSubmit(
    async (data: ForgotPasswordSchemaType) => {
      const response = await sendCode(data.email);
      const params = new URLSearchParams({
        userId: response.data.toString(),
      });

      if (!response.errors) {
        push(pathname + '?' + params.toString());
        onOpen();
      }
    },
  );

  return (
    <>
      <form onSubmit={onForgotPassword} className={styles.form}>
        <Icon name="logo" width={92} height={78} />
        <h3 className="heading3">Забули пароль?</h3>
        <p className={styles.text}>
          Просто введіть свою пошту — ми надішлемо інструкції для створення
          нового пароля
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
            onClick={back}
            type="button"
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

      <ValidateCodeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

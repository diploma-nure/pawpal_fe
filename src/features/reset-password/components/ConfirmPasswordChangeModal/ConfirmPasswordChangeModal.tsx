'use client';

import { Button, Icon, Modal } from '@/components/ui';
import { colors } from '@/styles/colors';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmPasswordChangeModal: FC<Props> = ({ isOpen, onClose }) => {
  const { push } = useRouter();

  const onConfirm = () => {
    push('/log-in');
  };

  const renderTitleIcon = () => (
    <Icon name="check" width={100} height={76} fill={colors.green} />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} renderTitleIcon={renderTitleIcon}>
      <p className={styles.text}>Ваш пароль успішно змінено!</p>

      <Button onClick={onConfirm}>Увійти</Button>
    </Modal>
  );
};

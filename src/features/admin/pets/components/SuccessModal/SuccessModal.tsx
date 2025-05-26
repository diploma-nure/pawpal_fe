'use client';

import { Icon, Modal } from '@/components/ui';
import { colors } from '@/styles/colors';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SuccessModal: FC<Props> = ({ isOpen, onClose }) => {
  const renderTitleIcon = () => (
    <Icon name="check" width={100} height={76} fill={colors.green} />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} renderTitleIcon={renderTitleIcon}>
      <p className={styles.text}>Тваринка успішно створена!</p>
    </Modal>
  );
};

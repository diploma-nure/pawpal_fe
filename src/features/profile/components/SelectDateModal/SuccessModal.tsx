'use client';

import { Icon, Modal } from '@/components/ui';
import { colors } from '@/styles/colors';
import dayjs from 'dayjs';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  date: Date | undefined;
  time: string;
};

export const SuccessModal: FC<Props> = ({ isOpen, onClose, date, time }) => {
  const renderTitleIcon = () => (
    <Icon name="check" width={100} height={76} fill={colors.green} />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} renderTitleIcon={renderTitleIcon}>
      <p className={styles.text}>
        Ви успішно записались на відеозустріч{' '}
        {dayjs(date).locale('uk').format('DD MMMM')} о {time}
      </p>
    </Modal>
  );
};

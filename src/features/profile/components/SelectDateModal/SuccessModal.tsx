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
  const formattedTime = dayjs()
    .set('hour', Number(time.slice(0, 2)))
    .set('minute', Number(time.slice(3, 5)))
    .set('second', 0)
    .set('millisecond', 0)
    .add(3, 'hours')
    .format('HH:mm');

  return (
    <Modal isOpen={isOpen} onClose={onClose} renderTitleIcon={renderTitleIcon}>
      <p className={styles.text}>
        Ви успішно записались на відеозустріч{' '}
        {dayjs(date).locale('uk').format('DD MMMM')} о {formattedTime}
      </p>
    </Modal>
  );
};

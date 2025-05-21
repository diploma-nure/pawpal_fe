'use client';

import { Modal } from '@/components/ui';
import { DateForm } from '@/features/profile/components/DateForm';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  applicationId: number;
  onSuccess?: () => void;
  handleChangeDate: ({
    selectedDate,
    selectedTime,
  }: {
    selectedDate: Date | undefined;
    selectedTime: string;
  }) => void;
};

export const SelectDateModal: FC<Props> = ({
  isOpen,
  onClose,
  applicationId,
  handleChangeDate,
  onSuccess,
}) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      renderTitleIcon={() => null}
    >
      <DateForm
        onSuccess={onSuccess}
        applicationId={applicationId}
        handleChangeDate={handleChangeDate}
      />
    </Modal>
  );
};

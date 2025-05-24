'use client';

import { Icon } from '@/components/ui';
import { JoinModal } from '@/features/meetings/components/JoinModal/JoinModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  applicationId: number;
};

export const JoinButton: FC<Props> = ({ applicationId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button className={styles.detailsLink} onClick={onOpen}>
        Приєднатись до зустрічі
        <Icon
          name="diagonal-arrow"
          width={24}
          height={24}
          style={{ transform: 'rotate(90deg)' }}
        />
      </button>

      <JoinModal
        isOpen={isOpen}
        onClose={onClose}
        applicationId={applicationId}
      />
    </>
  );
};

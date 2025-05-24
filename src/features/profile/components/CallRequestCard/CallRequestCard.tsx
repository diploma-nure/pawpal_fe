import { ApplicationStatus } from '@/features/admin/applications/components/ApplicationStatus';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import { ApplicationControl } from '@/features/profile/components/CallRequestCard/ApplicationControl';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pet: {
    id: number;
    name: string;
    pictureUrl: string;
  };
  status: number;
  createdAt: string;
  applicationId: number;
};

export const CallRequestCard: FC<Props> = ({
  pet,
  status,
  createdAt,
  applicationId,
}) => {
  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        <Image
          src={pet.pictureUrl ?? placeholderImages['2']}
          alt={`Pet ${pet.name}`}
          className={styles.image}
          width={72}
          height={72}
        />

        <div className={styles.info}>
          <h3 className={styles.name}>{pet.name}</h3>
          <p className={styles.description}>
            {dayjs(createdAt).format('MM.DD.YYYY')}
          </p>
        </div>
      </div>
      <div className={styles.statusWrapper}>
        <ApplicationStatus status={status} />
      </div>

      <div className={styles.actionsWrapper}>
        <ApplicationControl status={status} applicationId={applicationId} />
      </div>
    </div>
  );
};

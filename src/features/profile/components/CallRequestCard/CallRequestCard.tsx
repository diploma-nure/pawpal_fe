import { Button, Icon } from '@/components/ui';
import { ApplicationStatus } from '@/features/admin/applications/components/ApplicationStatus';
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
};

export const CallRequestCard: FC<Props> = ({ pet, status, createdAt }) => {
  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        <Image
          src={pet.pictureUrl}
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

      <ApplicationStatus status={status} />

      <div className={styles.actionsWrapper}>
        <Button variant="link" className={styles.detailsLink}>
          Приєднатись до зустрічі
          <Icon
            name="diagonal-arrow"
            width={24}
            height={24}
            style={{ transform: 'rotate(90deg)' }}
          />
        </Button>
      </div>
    </div>
  );
};

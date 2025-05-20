'use client';

import { ApplicationStatus } from '@/features/admin/applications/components/ApplicationStatus';
import { Application } from '@/features/admin/applications/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';
import styles from './styles.module.scss';
import { ApplicationControl } from '@/features/admin/applications/components/ApplicationCard/ApplicationControl';

type Props = {
  application: Application;
};

export const ApplicationCard: FC<Props> = ({ application }) => {
  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        {application.pet.pictureUrl && (
          <Image
            src={application.pet.pictureUrl}
            alt={`Pet ${application.pet.name}`}
            className={styles.image}
            width={72}
            height={72}
          />
        )}

        <div className={styles.info}>
          <p className={styles.name}>{application.pet.name}</p>
          <p>{application.user.fullName}</p>
          <p className={styles.description}>
            {dayjs(application.createdAt).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>

      <div className={styles.status}>
        <ApplicationStatus status={application.status} />
      </div>

      <div className={styles.actionsWrapper}>
        <ApplicationControl
          applicationId={application.id}
          status={application.status}
        />
      </div>
    </div>
  );
};

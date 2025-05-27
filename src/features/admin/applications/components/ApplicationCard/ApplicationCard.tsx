'use client';

import { ApplicationControl } from '@/features/admin/applications/components/ApplicationCard/ApplicationControl';
import { ApplicationStatus } from '@/features/admin/applications/components/ApplicationStatus';
import { Application } from '@/features/admin/applications/types';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  application: Application;
};

export const ApplicationCard: FC<Props> = ({ application }) => {
  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        <Image
          src={
            application.pet.pictureUrl ??
            placeholderImages[application.pet.species]
          }
          alt={`Pet ${application.pet.name}`}
          className={styles.image}
          width={72}
          height={72}
        />

        <div className={styles.info}>
          <Link
            target="_blank"
            href={`/pets/${application.pet.id}`}
            className={styles.name}
          >
            {application.pet.name}
          </Link>
          <Link
            href={`/admin/applications/${application.user.id}`}
            className={styles.userName}
            target="_blank"
          >
            <p>{application.user.fullName}</p>
          </Link>
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

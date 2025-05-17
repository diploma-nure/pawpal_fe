'use client';

import { Button, Icon } from '@/components/ui';
import { ApplicationStatus } from '@/features/admin/applications/components/ApplicationStatus';
import { Meeting } from '@/features/admin/applications/types';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  meeting: Meeting;
};

export const ApplicationCard: FC<Props> = ({ meeting }) => {
  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        {meeting.pet.pictureUrl && (
          <Image
            src={meeting.pet.pictureUrl}
            alt={`Pet ${meeting.pet.name}`}
            className={styles.image}
            width={72}
            height={72}
          />
        )}

        <div className={styles.info}>
          <p className={styles.name}>{meeting.pet.name}</p>
          <p>{meeting.user.fullName}</p>
          <p className={styles.description}>
            {dayjs(meeting.start).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>

      <div className={styles.status}>
        <ApplicationStatus status={meeting.status} />
      </div>

      <div className={styles.actionsWrapper}>
        <Button
          rightIcon={() => (
            <Icon
              name="diagonal-arrow"
              width={24}
              height={24}
              style={{ transform: 'rotate(90deg)' }}
              fill={colors.white}
            />
          )}
          disabled={meeting.status !== 0}
        >
          Призначити відеозустріч
        </Button>
        <Button disabled={meeting.status !== 0} variant="outline">
          Відхилити заявку
        </Button>
      </div>
    </div>
  );
};

'use client';

import { Button } from '@/components/ui';
import { useChangeApplicationStatus } from '@/features/admin/applications/api/changeApplicationStatus';
import { AdminJoinButton } from '@/features/admin/meetings/components/AdminJoinButton/AdminJoinButton';
import { MeetingStatus } from '@/features/admin/meetings/components/MeetingStatus';
import { Meeting } from '@/features/admin/meetings/types';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';
import { useChangeMeetingStatus } from '../../api/changeMeetingStatus';
import styles from './styles.module.scss';

type Props = {
  meeting: Meeting;
};

export const MeetingCard: FC<Props> = ({ meeting }) => {
  const changeApplicationStatusMutation = useChangeApplicationStatus();
  const changeMeetingStatusMutation = useChangeMeetingStatus();

  const handleCancelAdoption = () => {
    changeApplicationStatusMutation.mutate({
      applicationId: meeting.application.id,
      status: 5,
    });
  };

  const handleAcceptAdoption = () => {
    changeApplicationStatusMutation.mutate({
      applicationId: meeting.application.id,
      status: 4,
    });
  };

  const handleCancelMeeting = () => {
    changeMeetingStatusMutation.mutate({
      meetingId: meeting.id,
      status: 0,
    });
  };

  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        <Image
          src={meeting.pet.pictureUrl ?? placeholderImages['2']}
          alt={`Pet ${meeting.pet.name}`}
          className={styles.image}
          width={72}
          height={72}
        />

        <div className={styles.info}>
          <p className={styles.name}>{meeting.pet.name}</p>
          <p>{meeting.user.fullName}</p>
          <p className={styles.description}>
            {dayjs(meeting.start).format('DD.MM.YYYY')}
          </p>
        </div>
      </div>

      <div className={styles.status}>
        <MeetingStatus status={meeting.status} />
      </div>

      <div className={styles.actionsWrapper}>
        {meeting.status === 2 && (
          <>
            <Button onClick={handleAcceptAdoption}>Схвалити адопцію</Button>
            <Button variant="outline" onClick={handleCancelAdoption}>
              Відхилити адопцію
            </Button>
          </>
        )}

        {meeting.status !== 2 && (
          <>
            <AdminJoinButton
              meetingId={meeting.id}
              status={meeting.status}
              applicationId={meeting.application.id}
            />
            <Button
              onClick={handleCancelMeeting}
              disabled={meeting.status === 0}
              variant="outline"
            >
              Скасувати зустріч
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

'use client';

import { Button, Icon } from '@/components/ui';
import { MeetingStatus } from '@/features/admin/meetings/components/MeetingStatus';
import { Meeting } from '@/features/admin/meetings/types';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';
import styles from './styles.module.scss';
import { useChangeApplicationStatus } from '@/features/admin/applications/api/changeApplicationStatus';
import { useChangeMeetingStatus } from '../../api/changeMeetingStatus';

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
    changeMeetingStatusMutation.mutate({
      meetingId: meeting.id,
      status: 0,
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
              disabled={meeting.status === 0}
            >
              Приєднатись до зустрічі
            </Button>
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

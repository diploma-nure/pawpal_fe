import { meetingStatuses } from '@/features/admin/meetings/constants';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  status: number;
};

export const MeetingStatus: FC<Props> = ({ status }) => {
  const meetingStatus = meetingStatuses.find((s) => s.value === status);

  return (
    <div className={styles.status}>
      <p className={styles.statusText} data-color={meetingStatus?.value}>
        {meetingStatus?.title}
      </p>
    </div>
  );
};

'use client';

import { Pagination, Select } from '@/components/ui';
import { meetingStatuses } from '@/features/admin/applications/constants';
import { MeetingCard } from '@/features/admin/meetings/components/MeetingCard';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGetMeetings } from '../../api/getMeetings';
import styles from './styles.module.scss';

export const MeetingsModule: FC = () => {
  const params = useSearchParams();
  const page = params.get('page');
  const { control, watch } = useForm();
  const statuses: number[] = watch('statuses');

  const meetingQuery = useGetMeetings({
    payload: {
      page: page && !isNaN(parseInt(page)) ? parseInt(page) : 1,
      statuses: statuses ?? [],
    },
  });

  const items = meetingQuery?.data?.data.items;
  const count = meetingQuery?.data?.data.count;

  const totalPages = count ? Math.ceil(count / 10) : 0;
  return (
    <>
      <div className={styles.titleWrapper}>
        <h2 className="heading2">Відеозустрічі</h2>
      </div>

      <div className={styles.filters}>
        <Controller
          name="statuses"
          control={control}
          render={({ field }) => (
            <Select
              options={meetingStatuses}
              onChange={(value) => field.onChange(value)}
              value={field.value ?? []}
              placeholder="Статус заявки"
              multiselect
              className={styles.statuses}
            />
          )}
        />
      </div>

      <div className={styles.meetings}>
        {items?.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      <Pagination
        pageCount={totalPages ?? 10}
        page={page ? Number(page) : 1}
        href="/admin/meetings"
      />
    </>
  );
};

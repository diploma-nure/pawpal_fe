'use client';

import { Input, Pagination, Select } from '@/components/ui';
import { applicationStatuses } from '@/features/admin/applications/constants';
import { MeetingCard } from '@/features/admin/meetings/components/MeetingCard';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

export const MeetingsModule: FC = () => {
  const params = useSearchParams();
  const page = params.get('page');
  const [status, setStatus] = useState<number | null>(null);

  const { control } = useForm();

  const meetings = [
    {
      id: 0,
      status: 0,
      start: '2025-05-17T20:09:04.939Z',
      user: {
        id: 0,
        fullName: 'string',
      },
      pet: {
        id: 0,
        name: 'string',
        pictureUrl: '',
      },
      application: {
        id: 0,
      },
    },
  ];
  const totalPages = 0;

  return (
    <>
      <div className={styles.titleWrapper}>
        <h2 className="heading2">Відеозустрічі</h2>
      </div>

      <div className={styles.filters}>
        <Input
          classNames={styles.meetingsSearch}
          placeholder="Каспер"
          name="search"
          control={control}
        />
        <Select
          placeholder="Статус заявки"
          options={applicationStatuses}
          value={status}
          onChange={(value) => setStatus(value as number)}
        />
      </div>

      <div className={styles.meetings}>
        {meetings.map((meeting) => (
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

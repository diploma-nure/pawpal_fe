'use client';

import { Pagination, Select } from '@/components/ui';
import { ApplicationCard } from '@/features/admin/applications/components/ApplicationCard';
import { applicationStatuses } from '@/features/admin/applications/constants';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import styles from './styles.module.scss';

export const ApplicationsModule: FC = () => {
  const params = useSearchParams();
  const page = params.get('page');
  const [status, setStatus] = useState<number | null>(null);

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
        <h2 className="heading2">Заявки на усиновлення</h2>
        <Select
          placeholder="Статус заявки"
          options={applicationStatuses}
          value={status}
          onChange={(value: number) => setStatus(value)}
        />
      </div>
      <div>
        {meetings.map((meeting) => (
          <ApplicationCard key={meeting.id} meeting={meeting} />
        ))}

        <Pagination
          pageCount={totalPages ?? 10}
          page={page ? Number(page) : 1}
          href="/admin/meetings"
        />
      </div>
    </>
  );
};

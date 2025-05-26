'use client';

import { Pagination, Select } from '@/components/ui';
import { ApplicationCard } from '@/features/admin/applications/components/ApplicationCard';
import { applicationStatuses } from '@/features/admin/applications/constants';
import { useGetApplications } from '@/features/profile/hooks/useGetApplications';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import styles from './styles.module.scss';

export const ApplicationsModule: FC = () => {
  const params = useSearchParams();
  const page = params.get('page');
  const [status, setStatus] = useState<number[] | null>(null);
  const parsedPage = isNaN(parseInt(page as string))
    ? 1
    : parseInt(page as string);

  const { data } = useGetApplications({
    payload: {
      page: parsedPage,
      status: status,
    },
  });

  const items = data?.data.items;
  const count = data?.data.count;

  const totalPages = count ? Math.ceil(count / 10) : 0;

  return (
    <>
      <div className={styles.titleWrapper}>
        <h2 className="heading2">Заявки на усиновлення</h2>
        <Select
          placeholder="Статус заявки"
          options={applicationStatuses}
          value={status}
          onChange={(value) => setStatus(value as number[])}
          multiselect
          className={styles.statusSelect}
        />
      </div>

      <div className={styles.requestsWrapper}>
        {items?.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages ?? 10}
          page={page ? Number(page) : 1}
          href="/admin/applications"
        />
      )}
    </>
  );
};

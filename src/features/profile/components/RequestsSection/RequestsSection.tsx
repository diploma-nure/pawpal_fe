'use client';

import { Pagination } from '@/components/ui';
import { CallRequestCard } from '@/features/profile/components/CallRequestCard';
import { useGetApplications } from '@/features/profile/hooks/useGetApplications';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import styles from './styles.module.scss';

export const RequestsSection: FC = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const { data } = useGetApplications({
    payload: {
      page: isNaN(parseInt(page)) ? 1 : parseInt(page),
      status: null,
    },
  });

  const items = data?.data.items ?? null;
  const count = data?.data.count;

  const totalPages = count ? Math.ceil(count / 5) : 0;

  return (
    <div className={styles.tilesWrapper}>
      {items &&
        items.map((item) => (
          <CallRequestCard
            key={item.id}
            pet={item.pet}
            status={item.status}
            createdAt={item.createdAt}
            applicationId={item.id}
          />
        ))}
      <div style={{ marginTop: 'auto' }}>
        {totalPages >= 1 && (
          <Pagination
            page={parseInt(page)}
            pageCount={totalPages}
            href="/profile/requests"
          />
        )}
      </div>
    </div>
  );
};

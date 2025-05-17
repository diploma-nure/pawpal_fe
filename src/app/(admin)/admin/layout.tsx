'use client';

import { AdminHeader, Container } from '@/components/layout';
import { colors } from '@/styles/colors';
import { ReactNode } from 'react';
import styles from './style.module.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from '@/lib/reactQuery';
import { QueryClient } from '@tanstack/query-core';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export default function AdminLayout({ children }: Readonly<Props>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminHeader bgColor={colors.beige} />
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
    </QueryClientProvider>
  );
}

'use client';

import { queryConfig } from '@/lib/reactQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

type Props = {
  children: ReactNode;
};

export const QueryProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

'use client';

import { useGetUser } from '@/features/profile/hooks';
import { useTokenValid } from '@/hooks/useTokenValid';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const LikeButtonWrapper: FC<Props> = ({ children }) => {
  const user = useGetUser();
  const isValid = useTokenValid();

  if (!isValid || !user) {
    return null;
  }

  return children;
};

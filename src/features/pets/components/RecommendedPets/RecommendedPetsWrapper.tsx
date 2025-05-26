'use client';

import { RecommendedPets } from '@/features/pets/components/RecommendedPets/RecommendedPets';
import { useGetUser } from '@/features/profile/hooks';
import { useIsClient } from '@/hooks/useIsClient';
import { useTokenValid } from '@/hooks/useTokenValid';

export const RecommendedPetsWrapper = () => {
  const user = useGetUser();
  const isValid = useTokenValid();
  const isClient = useIsClient();

  if (!isValid || !user || user?.role !== 'User') {
    return null;
  }

  if (!isClient) {
    return null;
  }

  return <RecommendedPets />;
};

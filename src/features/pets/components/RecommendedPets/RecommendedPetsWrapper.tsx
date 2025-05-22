'use client';

import { RecommendedPets } from '@/features/pets/components/RecommendedPets/RecommendedPets';
import { useGetUser } from '@/features/profile/hooks';
import { useTokenValid } from '@/hooks/useTokenValid';

export const RecommendedPetsWrapper = () => {
  const user = useGetUser();
  const isValid = useTokenValid();

  if (!isValid || !user || user?.role !== 'User') {
    return null;
  }

  return <RecommendedPets />;
};

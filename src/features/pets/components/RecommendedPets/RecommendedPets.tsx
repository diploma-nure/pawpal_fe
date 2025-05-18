'use client';

import { useRecommendedPets } from '@/features/pets/api/getRecommendedPets';
import { PetsGrid } from '@/features/pets/components/PetsGrid/PetsGrid';

export const RecommendedPets = () => {
  const { data, error } = useRecommendedPets({
    payload: {
      Page: '1',
      PageSize: '3',
    },
  });

  return !error ? <PetsGrid pets={data?.data.items} /> : null;
};

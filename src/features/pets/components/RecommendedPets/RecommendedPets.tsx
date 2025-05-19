'use client';

import { useRecommendedPets } from '@/features/pets/api/getRecommendedPets';
import { PetsGrid } from '@/features/pets/components/PetsGrid/PetsGrid';
import styles from './styles.module.scss';

export const RecommendedPets = () => {
  const { data, error } = useRecommendedPets({
    payload: {
      Page: '1',
      PageSize: '3',
    },
  });

  return !error ? (
    <div className={styles.recommendedWrapper}>
      <div className={styles.titleWrapper}>
        <h2 className="heading2">Інші хвостики</h2>
      </div>
      <PetsGrid pets={data?.data.items} /> ;
    </div>
  ) : null;
};

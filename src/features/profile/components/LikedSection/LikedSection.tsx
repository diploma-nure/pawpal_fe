'use client';

import { Pet } from '@/features/pets/types';
import { PetTile } from '@/features/profile/components/PetTile/PetTile';
import { useGetUsersPetsLiked } from '@/features/profile/hooks';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pets: Pet[];
};

export const LikedSection: FC<Props> = () => {
  const { data } = useGetUsersPetsLiked();

  return (
    <div className={styles.tilesWrapper}>
      {data?.data.map((pet) => <PetTile key={pet.id} pet={pet} />)}
      {data?.data.length === 0 && (
        <h2 className="heading3">Ви ще не додали тваринок в збережені :(</h2>
      )}
    </div>
  );
};

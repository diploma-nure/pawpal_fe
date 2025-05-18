import { PetCard } from '@/features/pets/components/PetCard/PetCard';
import { Pet } from '@/features/pets/types';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pets?: Pet[];
};

export const PetsGrid: FC<Props> = ({ pets }) => {
  return (
    <div className={styles.grid}>
      {pets?.map((pet) => <PetCard key={pet.id} pet={pet} />)}
    </div>
  );
};

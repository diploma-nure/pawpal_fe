import { PetTile } from '@/features/admin/pets/components/PetTile';
import { PaginatedPet } from '@/features/pets/types';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pets: PaginatedPet[];
};

export const PetList: FC<Props> = ({ pets }) => {
  return (
    <div className={styles.petsList}>
      {pets.map((pet) => (
        <PetTile pet={pet} key={pet.id} />
      ))}
    </div>
  );
};

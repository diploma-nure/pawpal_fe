import { Pet } from '@/features/pets/types';
import { FC } from 'react';
import { PetTile } from '@/features/admin/pets/components/PetTile';
import styles from './styles.module.scss';

type Props = {
  pets: Pet[];
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

import { Pet } from '@/features/pets/types';
import { PetTile } from '@/features/profile/components/PetTile/PetTile';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pets: Pet[];
};

const samplePets: Pet[] = [
  {
    id: 1,
    name: 'Каспер',
    species: 1,
    gender: 1,
    size: 2,
    age: 3,
    hasSpecialNeeds: false,
    description:
      'Дружелюбний та активний песик, який любить прогулянки та ігри. Добре ладить з дітьми та іншими тваринами.',
    pictureUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    id: 2,
    name: 'Лілі',
    species: 1,
    gender: 1,
    size: 1,
    age: 2,
    hasSpecialNeeds: true,
    description:
      "Ніжна та ласкава собачка, яка любить тепло та затишок. Потребує особливого догляду через проблеми зі здоров'ям.",
    pictureUrl:
      'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
  },
  {
    id: 3,
    name: 'Мурчик',
    species: 0,
    gender: 1,
    size: 1,
    age: 1,
    hasSpecialNeeds: false,
    description:
      "Грайливий котик, який обожнює м'які іграшки та сонячні місця. Має доброзичливий характер.",
    pictureUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80',
  },
];

export const LikedSection: FC<Props> = ({ pets = samplePets }) => {
  return (
    <div className={styles.tilesWrapper}>
      {pets.map((pet) => (
        <PetTile key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

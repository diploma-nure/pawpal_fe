'use client';

import { Tag } from '@/components/ui';
import { Icon } from '@/components/ui/Icon/Icon';
import {
  Pet,
  PetAge,
  PetGender,
  PetSize,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import styles from './styles.module.scss';

interface PetCardProps {
  pet: Pet;
  className?: string;
}
export const PetCard: FC<PetCardProps> = ({ pet, className }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.imageContainer}>
        <Image
          src={pet.pictureUrl}
          alt={`Pet ${pet.name}`}
          className={styles.image}
          width={350}
          height={320}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{pet.name}</h3>
          <button
            onClick={toggleFavorite}
            className={styles.favoriteButton}
            aria-label={
              isFavorite ? 'Видалити з улюблених' : 'Додати до улюблених'
            }
          >
            <Icon
              name={isFavorite ? 'heart-filled' : 'heart'}
              width={24}
              height={24}
              fill={isFavorite ? colors.pink : 'transparent'}
              stroke={isFavorite ? colors.pink : colors.darkBlue}
            />
          </button>
        </div>

        <div className={styles.tags}>
          <Tag variant="gender">{PetGender[pet.gender]}</Tag>
          <Tag variant="age">{PetAge[pet.age]}</Tag>
          <Tag variant="size">{PetSize[pet.size].split(' ').at(0)}</Tag>
          <Tag variant="specialNeeds">
            {PetsSpecialNeeds[pet.hasSpecialNeeds ? 1 : 0]}
          </Tag>
        </div>

        <p className={styles.description}>{pet.description}</p>

        <Link href={`/pets/${pet.id}`} className={styles.detailsLink}>
          Детальніше
          <Icon
            name="diagonal-arrow"
            width={24}
            height={24}
            style={{ transform: 'rotate(90deg)' }}
          />
        </Link>
      </div>
    </div>
  );
};

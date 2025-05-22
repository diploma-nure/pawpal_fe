'use client';

import { Tag } from '@/components/ui';
import { Icon } from '@/components/ui/Icon/Icon';
import { LikeButton } from '@/features/pets/components/PetInfo/LikeButton';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import {
  PaginatedPet,
  PetAge,
  PetGender,
  PetSize,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import { useGetUser } from '@/features/profile/hooks';
import { useTokenValid } from '@/hooks/useTokenValid';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './styles.module.scss';

interface PetCardProps {
  pet: PaginatedPet;
  className?: string;
}

export const PetCard: FC<PetCardProps> = ({ pet, className }) => {
  const user = useGetUser();
  const isValid = useTokenValid();

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.imageContainer}>
        <Image
          src={pet.pictureUrl ?? placeholderImages[pet.species]}
          alt={`Pet ${pet.name}`}
          className={styles.image}
          width={350}
          height={320}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{pet.name}</h3>

          {isValid && user && <LikeButton petId={pet.id} />}
        </div>

        <div className={styles.tags}>
          <Tag variant="gender">
            {PetGender.find((g) => g.value === pet.gender)?.title}
          </Tag>
          <Tag variant="age">
            {PetAge.find((a) => a.value === pet.age)?.title}
          </Tag>
          <Tag variant="size">
            {PetSize.find((s) => s.value === pet.size)
              ?.title.split(' ')
              .at(0)}
          </Tag>
          <Tag variant="specialNeeds">
            {
              PetsSpecialNeeds.find(
                (sn) => sn.value === Number(pet.hasSpecialNeeds),
              )?.title
            }
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

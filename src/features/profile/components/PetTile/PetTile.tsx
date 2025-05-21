'use client';

import { Button, Icon, Tag } from '@/components/ui';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import { useUnlikePet } from '@/features/pets/hooks';
import {
  Pet,
  PetAge,
  PetGender,
  PetSize,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pet: Pet;
};

export const PetTile: FC<Props> = ({ pet }) => {
  const unlikeMutation = useUnlikePet();

  const handleUnlike = async () => {
    await unlikeMutation.mutateAsync({ petId: pet.id });
  };

  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        <Image
          src={pet.pictures?.[0]?.url ?? placeholderImages[pet.species]}
          alt={`Pet ${pet.name}`}
          className={styles.image}
          width={72}
          height={72}
        />

        <div className={styles.info}>
          <h3 className={styles.name}>{pet.name}</h3>
          <p className={styles.description}>{pet.description}</p>
        </div>
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

      <div className={styles.actionsWrapper}>
        <div className={styles.deleteButton}>
          <Button variant="link" onClick={handleUnlike}>
            <Icon name="bucket" width={20} height={20} />
          </Button>
        </div>

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

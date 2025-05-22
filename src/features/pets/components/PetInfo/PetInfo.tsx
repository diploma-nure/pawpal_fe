import { Tag } from '@/components/ui';
import { LikeButton } from '@/features/pets/components/PetInfo/LikeButton';
import { LikeButtonWrapper } from '@/features/pets/components/PetInfo/LikeButtonWrapper';
import { MakeHappyButton } from '@/features/pets/components/PetInfo/MakeHappyButton';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import {
  Pet,
  PetAge,
  PetGender,
  PetSize,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pet: Pet;
};

export const PetInfo: FC<Props> = ({ pet }) => {
  return (
    <div className="grid">
      <div
        className={clsx(
          'col-desktop-1-6 col-tablet-1-3 col-1-2',
          styles.imageWrapper,
        )}
      >
        <Image
          className={styles.petImage}
          src={pet.pictures?.[0]?.url ?? placeholderImages[pet.species]}
          alt={`Фото тваринки ${pet.name}`}
          width={300}
          height={300}
        />
      </div>
      <div className="col-desktop-7-12 col-tablet-4-6 col-1-2">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 className="heading1">{pet.name}</h1>
          <LikeButtonWrapper>
            <LikeButton petId={pet.id} />
          </LikeButtonWrapper>
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
        <div className={styles.description}>
          <h4 className={clsx('heading4', styles.description__title)}>
            Про мене
          </h4>
          <p>{pet.description ?? 'На жаль, немає інформації про улюбленця'}</p>
        </div>

        <div className={styles.buttonWrapper}>
          <MakeHappyButton petId={pet.id} />
        </div>
      </div>
    </div>
  );
};

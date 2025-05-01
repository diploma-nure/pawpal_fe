import { Button, Icon } from '@/components/ui';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import { Pet } from '@/features/pets/types';
import { RequestStatus } from '@/features/profile/constants/tabs';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  pet: Pet;
};

export const CallRequestCard: FC<Props> = ({ pet }) => {
  const renderStatus = (status: keyof typeof RequestStatus) => {
    switch (status) {
      case 0:
        return (
          <div className={styles.status}>
            <Icon name="letter" fill={colors.yellow} />
            <p className={styles.status__invite}>{RequestStatus[status]}</p>
          </div>
        );
      case 1:
        return (
          <div className={styles.status}>
            <Icon name="video" color={colors.lightOrange} />
            <p className={styles.status__videoCall}>{RequestStatus[status]}</p>
          </div>
        );
      case 2:
        return (
          <div className={styles.status}>
            <Icon name="clock" color={colors.grey} />
            <p className={styles.status__onReview}>{RequestStatus[status]}</p>
          </div>
        );
    }
  };

  return (
    <div className={clsx(styles.card)}>
      <div className={styles.content}>
        <Image
          src={pet.pictureUrl ?? placeholderImages[pet.species]}
          alt={`Pet ${pet.name}`}
          className={styles.image}
          width={72}
          height={72}
        />

        <div className={styles.info}>
          <h3 className={styles.name}>{pet.name}</h3>
          <p className={styles.description}>{dayjs().format('mm dd YYYY')}</p>
        </div>
      </div>

      {renderStatus(0)}

      <div className={styles.actionsWrapper}>
        <Button variant="link" className={styles.detailsLink}>
          Приєднатись до зустрічі
          <Icon
            name="diagonal-arrow"
            width={24}
            height={24}
            style={{ transform: 'rotate(90deg)' }}
          />
        </Button>
        <div className={styles.deleteButton}>
          <Icon name="bucket" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

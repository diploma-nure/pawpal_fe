import { Icon } from '@/components/ui';
import { colors } from '@/styles/colors';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  text: string;
  author: {
    name: string;
    image: string | StaticImageData;
  };
};

export const ReviewCard: FC<Props> = ({ text, author }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.icon}>
        <Icon
          name="quotation-mark"
          width={40}
          height={30}
          fill={colors.orange}
        />
      </div>

      <p className={styles.reviewCardText}>{text}</p>

      <div className={styles.reviewCardAuthor}>
        <Image
          src={author.image}
          width={48}
          height={48}
          alt={`${author.name}-avatar`}
        />
        <p className={styles.reviewCardAuthorName}>{author.name}</p>
      </div>
    </div>
  );
};

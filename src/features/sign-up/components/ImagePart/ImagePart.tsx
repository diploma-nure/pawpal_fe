import SignUpGirl from '@/assets/images/signup-girl.svg';
import Image from 'next/image';
import styles from './styles.module.scss';

export const ImagePart = () => {
  return (
    <div className={styles.imagePart}>
      <Image
        src={SignUpGirl}
        alt="happy pawpal user"
        className={styles.image}
      />
    </div>
  );
};

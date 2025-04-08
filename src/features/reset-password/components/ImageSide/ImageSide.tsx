import ResetPassword from '@/assets/images/reset-password.png';
import Image from 'next/image';
import styles from './styles.module.scss';

export const ImageSide = () => {
  return (
    <div className={styles.imagePart}>
      <Image
        src={ResetPassword}
        alt="happy pawpal dog"
        className={styles.image}
      />
    </div>
  );
};

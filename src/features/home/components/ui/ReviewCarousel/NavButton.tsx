import { Button, Icon } from '@/components/ui';
import { colors } from '@/styles/colors';
import { FC } from 'react';
import { useSwiper } from 'swiper/react';
import styles from './styles.module.scss';

type Props = {
  direction: 'next' | 'prev';
};

export const NavButton: FC<Props> = ({ direction }) => {
  const swiper = useSwiper();
  console.log(swiper.activeIndex);
  const slide = () => {
    switch (direction) {
      case 'next':
      default:
        return swiper.slideNext();
      case 'prev':
        return swiper.slidePrev();
    }
  };

  const renderIcon = () => {
    switch (direction) {
      case 'next':
      default:
        return (
          <Icon
            height={28}
            width={28}
            name="dropdown-arrow"
            fill={colors.orange}
          />
        );
      case 'prev':
        return (
          <Icon
            width={28}
            height={28}
            fill={colors.orange}
            name="dropdown-arrow"
            className={styles.prevIcon}
          />
        );
    }
  };

  return (
    <Button className={styles.navButton} variant="outline" onClick={slide}>
      {renderIcon()}
    </Button>
  );
};

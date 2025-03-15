import { Container } from '@/components/layout';
import { AccentText, Button } from '@/components/ui';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import Image from 'next/image';
import Pet1 from '../../../../../assets/images/pet1.png';
import Pet2 from '../../../../../assets/images/pet2.png';
import Pet3 from '../../../../../assets/images/pet3.png';
import Pet4 from '../../../../../assets/images/pet4.png';
import styles from './styles.module.scss';

export const HeroSection = () => {
  return (
    <section className="section">
      <Container>
        <div className={clsx('grid', styles.hero)}>
          <div className="col-desktop-1-7 col-tablet-1-4 col-1-2">
            <h1 className={styles.heroTitle}>
              Подаруй свою <AccentText color={colors.orange}>любов</AccentText>{' '}
              тому, хто її потребує
            </h1>

            <p className={styles.heroSubTitle}>
              Тут є ті, хто мріє про тебе – махає хвостиком чи тихенько муркоче.
              Зроби перший крок!
            </p>
            <div className={styles.heroFindButton}>
              <Button>Знайти друга</Button>
            </div>
          </div>

          <div className="col-desktop-8-12 col-tablet-5-6">
            <div className={styles.collage}>
              <div className={styles.collageRow}>
                <Image src={Pet1} alt="Pet-1" />
                <Image src={Pet3} alt="Pet-3" />
              </div>

              <div className={styles.collageRow}>
                <Image src={Pet2} alt="Pet-2" />
                <Image src={Pet4} alt="Pet-4" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

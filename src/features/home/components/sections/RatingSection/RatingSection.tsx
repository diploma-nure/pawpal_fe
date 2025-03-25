import { Container } from '@/components/layout';
import { AccentText } from '@/components/ui';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import Image from 'next/image';
import Spits from '../../../../../assets/images/spits.png';
import { blocks } from './constants';
import styles from './styles.module.scss';

export const RatingSection = () => {
  return (
    <section className="section">
      <Container>
        <div className={clsx('grid', styles.section)}>
          <div className="col-desktop-1-5">
            <div className={styles.imageWrapper}>
              <Image
                src={Spits}
                alt="Map of Ukraine"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
          <div className="col-desktop-6-12 col-tablet-1-6 col-1-2">
            <div className={styles.titleWrapper}>
              <h2 className={clsx(styles.title, 'heading2')}>
                PawPal – місце, де любов знаходить{' '}
                <AccentText color={colors.orange}>дім</AccentText>
              </h2>
            </div>

            <div>
              <ul className={styles.list}>
                {blocks.map((block) => (
                  <li
                    className={styles.block}
                    style={{ backgroundColor: block.color }}
                    key={block.rating}
                  >
                    <h3 className="heading1">{block.rating}</h3>

                    <div className={styles.blockTitleWrapper}>
                      <h4 className={styles.blockTitle}>{block.title}</h4>
                    </div>

                    <p className={styles.blockDescription}>
                      {block.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

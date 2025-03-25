import { Container } from '@/components/layout';
import clsx from 'clsx';
import Image from 'next/image';
import UkraineMap from '../../../../../assets/images/UkraineMap.svg';
import { AddressList } from '../../ui/AddressList/AddressList';
import styles from './styles.module.scss';

export const MapSection = () => {
  return (
    <section className="section">
      <Container>
        <div className={clsx('grid', styles.section)}>
          <div className="col-desktop-1-4 col-tablet-1-6 col-1-2">
            <div className={styles.titleWrapper}>
              <h2 className={clsx(styles.title, 'heading2')}>
                Ми поруч, де б ви не були
              </h2>
            </div>

            <div className={styles.addressWrapper}>
              <AddressList />
            </div>
          </div>

          <div className="col-desktop-6-12 col-tablet-1-6 col-1-2">
            <Image
              src={UkraineMap}
              alt="Map of Ukraine"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              width={1000}
              height={600}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

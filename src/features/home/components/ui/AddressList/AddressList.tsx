import { Icon } from '@/components/ui';
import { addresses } from '../../sections/MapSection/constants';
import styles from './styles.module.scss';

export const AddressList = () => {
  return (
    <ul className={styles.addresses}>
      {addresses.map((address, i) => (
        <li className={styles.addressItem} key={i}>
          <div>
            <p className={styles.name}>{address.name}</p>
            <p className={styles.address}>{address.address}</p>
          </div>
          <Icon className={styles.arrow} name="diagonal-arrow" />
        </li>
      ))}
    </ul>
  );
};

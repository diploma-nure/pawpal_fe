import { AddPet } from '../AddPet/AddPet';
import styles from './styles.module.scss';

export const PetsModule = () => {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h2 className="heading2">Наші хвостики</h2>
        <AddPet />
      </div>
    </>
  );
};

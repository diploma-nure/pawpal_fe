import { Modal } from '@/components/ui';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const PlanVideoCallModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.titleWrapper}>
        <h3 className="heading3">Заплануйте відеозустріч</h3>
        <p className="heading3">
          Оберіть зручну дату на календарі, а потім виберіть з доступних
          варіантів часу нижче
        </p>
      </div>
    </Modal>
  );
};

import { Button, Icon, Modal } from '@/components/ui';
import { useDeletePet } from '@/features/pets/hooks/useDeletePet';
import { useDisclosure } from '@/hooks/useDisclosure';
import clsx from 'clsx';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  petId: number;
};

export const DeleteModal: FC<Props> = ({ petId }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deletePetMutation = useDeletePet();

  const handleDelete = () => {
    deletePetMutation.mutate({ petId });
  };

  return (
    <>
      <Button variant="link" className={styles.deleteButton} onClick={onOpen}>
        <Icon name="bucket" width={20} height={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        key={isOpen.toString()}
        onClose={onClose}
        className={clsx(styles.deleteModal)}
        modalBodyClassName={styles.deleteModalBody}
      >
        <div>
          <h3
            className="heading3"
            style={{ textAlign: 'center', marginBottom: '8px' }}
          >
            Точно видаляємо?
          </h3>
          <p className={styles.content}>
            Будьте уважні! Ця дія незворотна, і вся інформація зникне без
            можливості відновлення.
          </p>

          <div className={styles.buttonWrapper}>
            <Button variant="outline" onClick={onClose}>
              Ні, скасувати
            </Button>
            <Button onClick={handleDelete}>Так, видаляти</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

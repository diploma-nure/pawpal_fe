'use client';

import { Button, Icon } from '@/components/ui';
import { AddPetModal } from '@/features/admin/pets/components/AddPetModal';
import { SuccessModal } from '@/features/admin/pets/components/SuccessModal/SuccessModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { colors } from '@/styles/colors';
import { FC } from 'react';

export const AddPet: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onClose: onSuccessModalClose,
    onOpen: onSuccessModalOpen,
  } = useDisclosure();

  const handleClose = () => {
    onClose();
    onSuccessModalOpen();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={() => <Icon name="add" fill={colors.white} />}
      >
        Додати тваринку
      </Button>

      <AddPetModal
        key={`${isOpen.toString()}-add-pet`}
        isOpen={isOpen}
        onSuccess={handleClose}
        onClose={onClose}
      />
      <SuccessModal
        key={`${isSuccessModalOpen.toString()}-success`}
        isOpen={isSuccessModalOpen}
        onClose={onSuccessModalClose}
      />
    </>
  );
};

'use client';

import { Button, Icon } from '@/components/ui';
import { AddPetModal } from '@/features/admin/pets/components/AddPetModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { colors } from '@/styles/colors';
import { FC } from 'react';

export const AddPet: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={() => <Icon name="add" fill={colors.white} />}
      >
        Додати тваринку
      </Button>

      <AddPetModal key={isOpen.toString()} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

import { Button, Icon } from '@/components/ui';
import { UpdatePetModal } from '@/features/admin/pets/components/UpdatePetModal/UpdatePetModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { colors } from '@/styles/colors';
import { FC } from 'react';

type Props = {
  petId: number;
};

export const UpdatePetButton: FC<Props> = ({ petId }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button variant="link" onClick={onOpen}>
        <Icon name="edit" width={24} height={24} fill={colors.darkBlue} />
      </Button>

      <UpdatePetModal isOpen={isOpen} onClose={onClose} petId={petId} />
    </>
  );
};

import { Button, Icon } from '@/components/ui';
import { JoinModal } from '@/features/meetings/components/JoinModal/JoinModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { colors } from '@/styles/colors';
import { FC } from 'react';

type Props = {
  status: number;
  meetingId: number;
  applicationId?: number;
};

export const AdminJoinButton: FC<Props> = ({
  meetingId,
  applicationId,
  status,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hanldeSuccess = (): string => {
    const params = new URLSearchParams();

    if (applicationId) {
      params.append('applicationId', applicationId.toString());
    }

    if (meetingId) {
      params.append('meetingId', meetingId.toString());
    }

    return params.toString();
  };

  return (
    <>
      <Button
        rightIcon={() => (
          <Icon
            name="diagonal-arrow"
            width={24}
            height={24}
            style={{ transform: 'rotate(90deg)' }}
            fill={colors.white}
          />
        )}
        disabled={status === 0}
        onClick={onOpen}
      >
        Приєднатись до зустрічі
      </Button>
      <JoinModal
        isOpen={isOpen}
        onClose={onClose}
        meetingId={meetingId}
        onSuccess={hanldeSuccess}
      />
    </>
  );
};

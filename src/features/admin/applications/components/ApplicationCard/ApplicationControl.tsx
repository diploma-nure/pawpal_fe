import { Button, Icon } from '@/components/ui';
import { useChangeApplicationStatus } from '@/features/admin/applications/api/changeApplicationStatus';
import { colors } from '@/styles/colors';
import { FC } from 'react';

type Props = {
  applicationId: number;
  status: number;
};

export const ApplicationControl: FC<Props> = ({ applicationId, status }) => {
  const changeApplicationStatusMutation = useChangeApplicationStatus();

  const handleReject = () => {
    changeApplicationStatusMutation.mutate({
      applicationId,
      status: 5,
    });
  };

  const handleApproveMeeting = () => {
    changeApplicationStatusMutation.mutate({
      applicationId,
      status: 1,
    });
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
        disabled={status !== 0}
        onClick={handleApproveMeeting}
      >
        Призначити відеозустріч
      </Button>

      <Button onClick={handleReject} variant="outline">
        Відхилити заявку
      </Button>
    </>
  );
};

import { Button, Modal } from '@/components/ui';
import { joinMeeting } from '@/features/meetings/api/joinMeeting';
import { VideoPreview } from '@/features/meetings/components/VideoCallPreview/VideoCallPreview';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  applicationId?: number;
  meetingId?: number;
  onSuccess?: () => string;
};

export const JoinModal: FC<Props> = ({
  isOpen,
  onClose,
  applicationId,
  meetingId,
  onSuccess,
}) => {
  const { push } = useRouter();

  const handleJoin = async () => {
    try {
      const data = await joinMeeting({
        applicationId,
        meetingId,
      });

      if (data.errors?.length) {
        throw new Error(data.errors.join(', '));
      }

      Cookies.set('roomInfo', JSON.stringify(data.data));

      const params = onSuccess?.();
      if (params) {
        push(`/meeting/${data.data.roomName}?${params}`);
      } else {
        push(`/meeting/${data.data.roomName}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Сталася помилка. Спробуйте ще раз.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.joinModal}>
      <h3 className="heading3">Готові приєднатись?</h3>
      <VideoPreview />

      <Button onClick={handleJoin}>Приєднатись</Button>
    </Modal>
  );
};

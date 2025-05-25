import { Button, Modal } from '@/components/ui';
import { joinMeeting } from '@/features/meetings/api/joinMeeting';
import { VideoPreview } from '@/features/meetings/components/VideoCallPreview/VideoCallPreview';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
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
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);

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
        push(
          `/meeting/${data.data.roomName}?${params}&isCameraOn=${isCameraOn}&isMicOn=${isMicOn}`,
        );
      } else {
        push(
          `/meeting/${data.data.roomName}?isCameraOn=${isCameraOn}&isMicOn=${isMicOn}`,
        );
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
      <VideoPreview
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        setIsCameraOn={setIsCameraOn}
        setIsMicOn={setIsMicOn}
      />

      <Button onClick={handleJoin}>Приєднатись</Button>
    </Modal>
  );
};

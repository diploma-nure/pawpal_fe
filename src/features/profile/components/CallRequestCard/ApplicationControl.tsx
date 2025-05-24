import { Button, Icon } from '@/components/ui';
import { JoinButton } from '@/features/profile/components/JoinButton/JoinButton';
import { SelectDateModal } from '@/features/profile/components/SelectDateModal';
import { SuccessModal } from '@/features/profile/components/SelectDateModal/SuccessModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { FC, useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  status: number;
  applicationId: number;
};

export const ApplicationControl: FC<Props> = ({ status, applicationId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();

  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleChangeDate = ({
    selectedDate,
    selectedTime,
  }: {
    selectedDate: Date | undefined;
    selectedTime: string;
  }) => {
    setTime(selectedTime);
    setDate(selectedDate);
  };

  const handleSuccess = () => {
    onClose();
    onSuccessModalOpen();
  };

  const renderButton = () => {
    switch (status) {
      case 0:
      case 3:
      case 4:
      case 5:
        return (
          <Button variant="link" className={styles.connectToMeeting__disabled}>
            Приєднатись до зустрічі
            <Icon
              name="diagonal-arrow"
              width={24}
              height={24}
              style={{ transform: 'rotate(90deg)', flexShrink: 0 }}
            />
          </Button>
        );
      case 1:
        return (
          <>
            <Button
              variant="link"
              className={styles.detailsLink}
              onClick={onOpen}
            >
              Обрати дату й час
              <Icon
                name="diagonal-arrow"
                width={24}
                height={24}
                style={{ transform: 'rotate(90deg)', flexShrink: 0 }}
              />
            </Button>

            <SelectDateModal
              handleChangeDate={handleChangeDate}
              onSuccess={handleSuccess}
              key={isOpen.toString()}
              isOpen={isOpen}
              onClose={onClose}
              applicationId={applicationId}
            />

            <SuccessModal
              isOpen={isSuccessModalOpen}
              onClose={onSuccessModalClose}
              date={date}
              time={time}
            />
          </>
        );
      case 2:
        return <JoinButton applicationId={applicationId} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderButton()}
      <SelectDateModal
        handleChangeDate={handleChangeDate}
        onSuccess={handleSuccess}
        key={isOpen.toString()}
        isOpen={isOpen}
        onClose={onClose}
        applicationId={applicationId}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={onSuccessModalClose}
        date={date}
        time={time}
      />
    </>
  );
};

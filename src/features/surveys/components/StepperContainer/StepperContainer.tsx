import { Stepper } from '@/features/surveys/components/Stepper/Stepper';
import Image from 'next/image';
import { FC } from 'react';
import SurveyPetImage from '../../../../assets/images/SurveyPet.png';
import styles from './styles.module.scss';

export interface StepperContainerProps {
  currentStep?: number;
}

export const StepperContainer: FC<StepperContainerProps> = ({
  currentStep,
}) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        width={500}
        height={650}
        src={SurveyPetImage.src}
        alt="survey pet"
      />
      <Stepper currentStep={currentStep} />
    </div>
  );
};

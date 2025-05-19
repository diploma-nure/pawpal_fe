'use client';
import { Button } from '@/components/ui';
import { submitApplication } from '@/features/pets/api/submitApplication';
import { FC } from 'react';

type Props = {
  petId: number;
};

export const MakeHappyButton: FC<Props> = ({ petId }) => {
  const handleMakeHappy = async () => {
    try {
      await submitApplication({ petId });
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleMakeHappy}>Зробити щасливим</Button>;
};

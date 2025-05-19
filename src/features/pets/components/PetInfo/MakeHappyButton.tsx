'use client';
import { Button } from '@/components/ui';
import { submitApplication } from '@/features/pets/api/submitApplication';
import { useGetUser } from '@/features/profile/hooks';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

type Props = {
  petId: number;
};

export const MakeHappyButton: FC<Props> = ({ petId }) => {
  const user = useGetUser();
  const { push } = useRouter();

  const handleMakeHappy = async () => {
    try {
      if (user && user.role === 'Admin') return;

      if (user && user.role === 'User') {
        await submitApplication({ petId });
      } else {
        push('/log-in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleMakeHappy}>Зробити щасливим</Button>;
};

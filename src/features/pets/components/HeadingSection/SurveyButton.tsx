'use client';

import { Button } from '@/components/ui';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const SurveyButton = () => {
  const { push } = useRouter();

  const handleRedirectToSurvey = () => {
    const token = Cookies.get('token');

    if (token) {
      push('/survey');
    } else {
      toast('Перед тим як пройти анкетування, потрібно аутентифікуватись 🐾', {
        type: 'info',
        position: 'bottom-right',
      });
      push('/log-in');
    }
  };

  return <Button onClick={handleRedirectToSurvey}>Пройти анкетування</Button>;
};

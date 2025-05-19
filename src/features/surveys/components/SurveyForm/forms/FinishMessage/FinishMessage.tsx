'use client';

import { Button, Icon } from '@/components/ui';
import { useSurveyData } from '@/features/surveys/hooks/useFormData';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export const FinishMessage = () => {
  const { push } = useRouter();
  const surveyData = useSurveyData();

  useEffect(() => {
    // Log the combined survey data
    console.log('Complete survey data:', surveyData);

    // Here you could send the data to an API
    // Example: api.submitSurvey(surveyData);
  }, [surveyData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Icon name="logo" />
      </div>

      <div className={styles.content}>
        <h3 className="heading3">Дякуємо</h3>
        <p className={styles.message}>
          Готово! Тепер повертайся до списку тваринок і увімкни фільтр{' '}
          <span>«Показати мої рекомендації за анкетою»</span> — ми вже знайшли
          для тебе ідеальних пухнастиків
        </p>
      </div>
      <Button onClick={() => push('/pets')}>До пухнастиків</Button>
    </div>
  );
};

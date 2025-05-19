'use client';

import { Button, Icon } from '@/components/ui';
import { completeSurvey } from '@/features/surveys/api/completeSurvey';
import { useSurveyData } from '@/features/surveys/hooks/useFormData';
import { Survey } from '@/features/surveys/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export const FinishMessage = () => {
  const { push } = useRouter();
  const surveyData = useSurveyData();

  useEffect(() => {
    console.log('Complete survey data:', surveyData);
  }, [surveyData]);

  const handleCompleteSurvey = async () => {
    try {
      const res = await completeSurvey({
        survey: {
          ...surveyData,
        } as Omit<Survey, 'id'>,
      });

      if (res.message === 'Success') {
        push('/pets');
      }
    } catch (e) {
      console.error(e);
    }
  };

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
      <Button onClick={handleCompleteSurvey}>До пухнастиків</Button>
    </div>
  );
};

import { Survey } from '@/features/surveys/types';
import { authClient } from '@/lib/auth-client';

export type CompleteSurveysPayload = {
  survey: Omit<Survey, 'id'>;
};

type CompleteSurveysResponse = {
  data: number;
  message: string;
  errors: string[];
};

export const completeSurvey = async ({
  survey,
}: CompleteSurveysPayload): Promise<CompleteSurveysResponse> => {
  const response = await authClient.put('/surveys/complete', {
    ...survey,
  });

  return response.data;
};

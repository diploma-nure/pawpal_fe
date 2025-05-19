import { Survey } from '@/features/surveys/types';
import { authClient } from '@/lib/auth-client';

type GetSurveysPayload = {
  userId: number;
};

type GetSurveysResponse = {
  data: Survey;
  message: string;
  errors: string[];
};

export const getSurveys = async ({
  userId,
}: GetSurveysPayload): Promise<GetSurveysResponse> => {
  const response = await authClient.get('/surveys', {
    params: { UserId: userId },
  });

  return response.data;
};

import { Survey } from '@/features/surveys/types';
import { authClient } from '@/lib/auth-client';

type GetSurveysPayload = {
  id: number;
};

type GetSurveysResponse = {
  data: Survey;
  message: string;
  errors: string[];
};

export const getSurveys = async ({
  id,
}: GetSurveysPayload): Promise<GetSurveysResponse> => {
  const response = await authClient.get('/surveys', {
    params: { Id: id },
  });

  return response.data;
};

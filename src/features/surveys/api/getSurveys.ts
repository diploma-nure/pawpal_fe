import { Survey } from '@/features/surveys/types';
import { client } from '@/lib/api-client';

type GetSurveysPayload = {
  survey: Omit<Survey, 'id'>;
};

type GetSurveysResponse = {
  data: number;
  message: string;
  errors: string[];
};

export const completeSurveys = async ({
  survey,
}: GetSurveysPayload): Promise<GetSurveysResponse> => {
  const response = await client.put('/surveys/complete', {
    ...survey,
  });

  return response.data;
};

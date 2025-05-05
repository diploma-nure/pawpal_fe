import { Survey } from '@/features/surveys/types';
import { client } from '@/lib/api-client';

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
  const response = await client.get('/surveys', {
    params: { Id: id },
  });

  return response.data;
};

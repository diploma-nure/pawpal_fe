import { getSurveys } from '@/features/surveys/api/getSurveys';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getSurveyQueryOptions = (userId: number) => {
  return queryOptions({
    queryKey: ['userSurvey'],
    queryFn: () =>
      getSurveys({
        userId,
      }),
  });
};

type UseGetSurveyOptions = {
  queryConfig?: QueryConfig<typeof getSurveyQueryOptions>;
  userId: number;
};

export const useGetSurvey = ({ queryConfig, userId }: UseGetSurveyOptions) => {
  return useQuery({
    ...getSurveyQueryOptions(userId),
    ...queryConfig,
  });
};

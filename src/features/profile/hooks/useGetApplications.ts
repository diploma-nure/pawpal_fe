import {
  getApplications,
  GetApplicationsPayload,
} from '@/features/profile/api/getApplications';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getApplicationsQueryOptions = ({
  page,
  status,
}: GetApplicationsPayload) => {
  return queryOptions({
    queryKey: ['applications', page, status],
    queryFn: () =>
      getApplications({
        page,
        status,
      }),
  });
};

type UseGetApplicationsOptions = {
  queryConfig?: QueryConfig<typeof getApplicationsQueryOptions>;
  payload: GetApplicationsPayload;
};

export const useGetApplications = ({
  queryConfig,
  payload,
}: UseGetApplicationsOptions) => {
  return useQuery({
    ...getApplicationsQueryOptions({
      ...payload,
    }),
    ...queryConfig,
  });
};

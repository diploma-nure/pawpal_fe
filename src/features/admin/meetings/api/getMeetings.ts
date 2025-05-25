import { authClient } from '@/lib/auth-client';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { Meeting } from '../types';

type MeetingPayload = {
  statuses: number[];
  page: number;
};

type MeetingResponse = {
  data: {
    items: Meeting[];
    page: number;
    pageSize: number;
    count: number;
  };
  message: string | null;
  errors: string[] | null;
};

export const getMeetings = async ({
  statuses = [],
  page = 1,
}: MeetingPayload): Promise<MeetingResponse> => {
  const StatusesSearch = statuses
    .map((status) => `Statuses=${status}`)
    .join('&');

  const response = await authClient.get<MeetingResponse>(
    `/meetings/filtered?${StatusesSearch}`,
    {
      params: {
        ['Pagination.Page']: page,
        ['Pagination.PageSize']: 5,
      },
    },
  );

  return response.data;
};

export const getMeetingsQueryOptions = (payload: MeetingPayload) => {
  return queryOptions({
    queryKey: ['pets', 'filtered', payload],
    queryFn: () =>
      getMeetings({
        ...payload,
      }),
  });
};

type UseGetMeetingsOptions = {
  payload: MeetingPayload;
  queryConfig?: QueryConfig<typeof getMeetingsQueryOptions>;
};

export const useGetMeetings = ({
  queryConfig,
  payload,
}: UseGetMeetingsOptions) => {
  return useQuery({
    ...getMeetingsQueryOptions(payload),
    ...queryConfig,
  });
};

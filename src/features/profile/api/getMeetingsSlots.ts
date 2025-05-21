import { authClient } from '@/lib/auth-client';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

type Slot = {
  date: string; // YYYY-MM-DD, E.g. 2023-10-01
  isAvailable: boolean;
  timeSlots: [
    {
      isAvailable: boolean;
      time: string; // HH:mm:ss E.g. 12:00:00
    },
  ];
};

type GetMeetingsSlotsResponse = {
  data: Slot[];
  message: string;
  errors: string[] | null;
};

type GetMeetingsSlotsPayload = {
  startDate: string;
  endDate: string;
  applicationId: number;
};

export const getMeetingsSlots = async ({
  startDate,
  endDate,
}: GetMeetingsSlotsPayload) => {
  const response = await authClient.get('/meetings/slots', {
    params: {
      StartDate: startDate,
      EndDate: endDate,
    },
  });
  const data: GetMeetingsSlotsResponse = response.data;

  return data;
};

export const getMeetingsSlotsOptions = ({
  startDate,
  endDate,
  applicationId,
}: GetMeetingsSlotsPayload) => {
  return queryOptions({
    queryKey: ['meetings-slots', startDate, endDate],
    queryFn: () =>
      getMeetingsSlots({
        startDate,
        endDate,
        applicationId,
      }),
  });
};

type GetMeetingsSlotsOptions = {
  queryConfig?: QueryConfig<typeof getMeetingsSlotsOptions>;
  payload: GetMeetingsSlotsPayload;
};

export const useGetMeetingsSlots = ({
  queryConfig,
  payload,
}: GetMeetingsSlotsOptions) => {
  return useQuery({
    ...getMeetingsSlotsOptions({
      ...payload,
    }),
    ...queryConfig,
  });
};

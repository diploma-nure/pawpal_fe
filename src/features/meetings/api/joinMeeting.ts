import { authClient } from '@/lib/auth-client';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

type Payload = {
  applicationId?: number;
  meetingId?: number;
};

type Response = {
  data: {
    url: string;
    roomName: string;
    token: string;
  };
  message: string;
  errors: string[];
};

export const joinMeeting = async (payload: Payload): Promise<Response> => {
  const preparePayload = {};

  if (payload?.applicationId) {
    Object.assign(preparePayload, {
      ApplicationId: payload.applicationId,
    });
  }
  if (payload?.meetingId) {
    Object.assign(preparePayload, {
      MeetingId: payload.meetingId,
    });
  }

  const response = await authClient.get('/meetings/join', {
    params: {
      ...preparePayload,
    },
  });

  return response.data;
};

export const joinMeetingQueryOptions = (payload: Payload) => {
  return queryOptions({
    queryKey: ['meeting-info'],
    queryFn: () =>
      joinMeeting({
        ...payload,
      }),
  });
};

type UseJoinMeetingOptions = {
  payload: Payload;
  queryConfig?: QueryConfig<typeof joinMeetingQueryOptions>;
};

export const useJoinMeeting = ({
  queryConfig,
  payload,
}: UseJoinMeetingOptions) => {
  return useQuery({
    ...joinMeetingQueryOptions(payload),
    ...queryConfig,
  });
};

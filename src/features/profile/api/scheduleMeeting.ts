import { authClient } from '@/lib/auth-client';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ScheduleMeetingResponse = {
  data: number;
  message: string;
  errors: null;
};

type ScheduleMeetingPayload = {
  applicationId: number;
  start: string;
  end: string;
};

export const scheduleMeeting = async (payload: ScheduleMeetingPayload) => {
  const response = await authClient.post('/meetings/schedule', { ...payload });
  const data: ScheduleMeetingResponse = response.data;

  return data;
};

type UseScheduleMeetingOptions = {
  config?: MutationConfig<typeof scheduleMeeting>;
};

export const useScheduleMeeting = ({
  config,
}: UseScheduleMeetingOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: scheduleMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['meetings-slots', 'applications'],
      });
    },
    ...config,
  });
};

import { authClient } from '@/lib/auth-client';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ChangeMeetingStatusResponse = {
  data: number | null;
  message: string;
  errors: string[] | null;
};

export type ChangeMeetingStatusPayload = {
  meetingId: number;
  status: number;
};

export const changeMeetingStatus = async ({
  meetingId,
  status,
}: ChangeMeetingStatusPayload): Promise<ChangeMeetingStatusResponse> => {
  const response = await authClient.patch<ChangeMeetingStatusResponse>(
    `/meetings/status`,
    {
      meetingId,
      status,
    },
  );

  return response.data;
};

type UseChangeMeetingStatus = {
  config?: MutationConfig<typeof changeMeetingStatus>;
};

export const useChangeMeetingStatus = ({
  config,
}: UseChangeMeetingStatus = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeMeetingStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', 'meetings'] });
    },
    ...config,
  });
};

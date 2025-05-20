import { authClient } from '@/lib/auth-client';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ChangeApplicationStatusResponse = {
  data: number | null;
  message: string;
  errors: string[] | null;
};

export type ChangeApplicationStatusPayload = {
  applicationId: number;
  status: number;
};

export const changeApplicationStatus = async ({
  applicationId,
  status,
}: ChangeApplicationStatusPayload): Promise<ChangeApplicationStatusResponse> => {
  const response = await authClient.patch<ChangeApplicationStatusResponse>(
    `/applications/status`,
    {
      applicationId,
      status,
    },
  );

  return response.data;
};

type UseChangeApplicationStatus = {
  config?: MutationConfig<typeof changeApplicationStatus>;
};

export const useChangeApplicationStatus = ({
  config,
}: UseChangeApplicationStatus = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    ...config,
  });
};

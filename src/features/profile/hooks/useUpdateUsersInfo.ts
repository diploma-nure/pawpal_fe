import { updateUsersInfo } from '@/features/profile/api/updateUsersInfo';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseUpdateUsersInfoOptions = {
  config?: MutationConfig<typeof updateUsersInfo>;
};

export const useUpdateUsersInfo = ({
  config,
}: UseUpdateUsersInfoOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUsersInfo,
    onSuccess: () => {
      // Invalidate the userInfo query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
    ...config,
  });
};

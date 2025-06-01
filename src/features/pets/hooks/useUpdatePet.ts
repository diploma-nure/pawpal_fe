import { updatePet } from '@/features/pets/api/updatePet';
import type { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdatePet = (config?: MutationConfig<typeof updatePet>) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    mutationFn: updatePet,
    onSettled: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('pets'),
      });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(data?.data),
        refetchType: 'none',
      });
    },
  });
};

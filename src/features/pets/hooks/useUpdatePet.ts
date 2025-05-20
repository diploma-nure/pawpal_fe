import { updatePet } from '@/features/pets/api/updatePet';
import type { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdatePet = (config?: MutationConfig<typeof updatePet>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    ...config,
  });
};

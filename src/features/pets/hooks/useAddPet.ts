import type { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPet } from '../api/addPet';

export const useAddPet = (config?: MutationConfig<typeof addPet>) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    mutationFn: addPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
};

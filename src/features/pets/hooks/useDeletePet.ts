import { deletePet } from '@/features/pets/api/deletePet';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseDeletePet = {
  config?: MutationConfig<typeof deletePet>;
};

export const useDeletePet = ({ config }: UseDeletePet = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    mutationFn: deletePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets', 'filtered'] });
    },
  });
};

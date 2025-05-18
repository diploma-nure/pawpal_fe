import { unlikePet } from '@/features/pets/api/unlikePet';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseUnlikePetOptions = {
  config?: MutationConfig<typeof unlikePet>;
};

export const useUnlikePet = ({ config }: UseUnlikePetOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userLikedPets'] });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    ...config,
  });
};

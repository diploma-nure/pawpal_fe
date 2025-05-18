import { likePet } from '@/features/pets/api/likePet';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseLikePetOptions = {
  config?: MutationConfig<typeof likePet>;
};

export const useLikePet = ({ config }: UseLikePetOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePet,
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['userLikedPets'] });
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    ...config,
  });
};

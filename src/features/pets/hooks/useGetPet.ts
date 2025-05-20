import { useQuery } from '@tanstack/react-query';
import { getPet } from '../api/getPet';

export const useGetPet = (id: number | string, options = {}) => {
  return useQuery({
    queryKey: ['pet', id],
    queryFn: () => getPet({ id: String(id) }),
    ...options,
  });
};

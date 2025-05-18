import { getUsersPetsLiked } from '@/features/profile/api/getUsersLikedPets';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUsersPetsLikedQueryOptions = () => {
  return queryOptions({
    queryKey: ['userLikedPets'],
    queryFn: () => getUsersPetsLiked(),
  });
};

type UseGetUsersPetsLikedOptions = {
  queryConfig?: QueryConfig<typeof getUsersPetsLikedQueryOptions>;
  enabled?: boolean;
};

export const useGetUsersPetsLiked = ({
  queryConfig,
  enabled = true,
}: UseGetUsersPetsLikedOptions = {}) => {
  return useQuery({
    ...getUsersPetsLikedQueryOptions(),
    enabled,
    ...queryConfig,
  });
};

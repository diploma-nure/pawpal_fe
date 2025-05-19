import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { getPetFeatures } from '../api/getPetFeatures';

export const petFeaturesQueryOptions = () => {
  return queryOptions({
    queryKey: ['petFeatures'],
    queryFn: () => getPetFeatures(),
  });
};

type UsePetFeaturesOptions = {
  queryConfig?: QueryConfig<typeof petFeaturesQueryOptions>;
};

export const usePetFeatures = ({ queryConfig }: UsePetFeaturesOptions = {}) => {
  return useQuery({
    ...petFeaturesQueryOptions(),
    ...queryConfig,
  });
};

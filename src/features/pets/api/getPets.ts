import { getFilteredPetsQueryOptions } from '@/features/pets/api/getFilteredPets';
import { getRecommendedPetsQueryOptions } from '@/features/pets/api/getRecommendedPets';
import { QueryConfig } from '@/lib/reactQuery';
import { useQuery } from '@tanstack/react-query';

type PetsPayload = {
  Species?: number[];
  Sizes?: number[];
  Ages?: number[];
  Genders?: number[];
  Page?: string;
  SortBy?: string;

  ShowRecommended?: boolean;
  token?: string;
};

type UseGetPetsOptions = {
  payload?: PetsPayload;
  queryConfig?: QueryConfig<
    typeof getFilteredPetsQueryOptions | typeof getRecommendedPetsQueryOptions
  >;
};

export const usePets = ({ queryConfig, payload }: UseGetPetsOptions) => {
  const getPetsQueryOptions =
    payload?.ShowRecommended && payload?.token
      ? getRecommendedPetsQueryOptions({ ...payload })
      : getFilteredPetsQueryOptions({ ...payload });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useQuery({
    ...getPetsQueryOptions,
    ...queryConfig,
  });
};

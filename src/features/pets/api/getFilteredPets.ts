import { Pet } from '@/features/pets/types';
import { client } from '@/lib/api-client';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

type FilteredPetsPayload = {
  Species?: string;
  Sizes?: string;
  Ages?: string;
  Genders?: string;
  Page?: string;
  SortBy?: string;
};

type FilteredPetsResponse = {
  data: {
    items: Pet[];
    page: number;
    pageSize: number;
    count: number;
  };
  message: string;
  errors: string[];
};

export const getFilteredPets = async ({
  Species,
  Sizes,
  Ages,
  Genders,
  Page,
  SortBy,
}: FilteredPetsPayload): Promise<FilteredPetsResponse> => {
  const response = await client.get<FilteredPetsResponse>('/pets/filtered', {
    params: {
      Species,
      Sizes,
      Ages,
      Genders,
      'Pagination.Page': Page ?? 1,
      'Pagination.PageSize': 9,
      'Sorting.Type': SortBy ?? 2,
      'Sorting.Direction': 0,
    },
  });

  return response.data;
};

export const getFilteredPetsQueryOptions = (
  payload: FilteredPetsPayload = {},
) => {
  return queryOptions({
    queryKey: [payload],
    queryFn: () =>
      getFilteredPets({
        ...payload,
      }),
  });
};

type UseFilteredPetsOptions = {
  payload?: FilteredPetsPayload;
  queryConfig?: QueryConfig<typeof getFilteredPetsQueryOptions>;
};

export const useFilteredPets = ({
  queryConfig,
  payload,
}: UseFilteredPetsOptions) => {
  return useQuery({
    ...getFilteredPetsQueryOptions({ ...payload }),
    ...queryConfig,
  });
};

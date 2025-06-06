import { PaginatedPet } from '@/features/pets/types';
import { client } from '@/lib/api-client';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

type FilteredPetsPayload = {
  Species?: number[];
  Sizes?: number[];
  Ages?: number[];
  Genders?: number[];
  HasSpecialNeeds?: number[];
  Page?: string;
  SortBy?: string;
  PageSize?: number;
};

type FilteredPetsResponse = {
  data: {
    items: PaginatedPet[];
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
  HasSpecialNeeds,
  PageSize = 9,
}: FilteredPetsPayload): Promise<FilteredPetsResponse> => {
  const params = new URLSearchParams();

  // Add array parameters multiple times for each value
  if (Species && Species.length > 0) {
    Species.forEach((species) => params.append('Species', species.toString()));
  }
  if (Sizes && Sizes.length > 0) {
    Sizes.forEach((size) => params.append('Sizes', size.toString()));
  }
  if (Ages && Ages.length > 0) {
    Ages.forEach((age) => params.append('Ages', age.toString()));
  }
  if (Genders && Genders.length > 0) {
    Genders.forEach((gender) => params.append('Genders', gender.toString()));
  }

  if (HasSpecialNeeds?.length === 1 && HasSpecialNeeds[0] === 1) {
    params.append('HasSpecialNeeds', 'true');
  } else if (HasSpecialNeeds?.length === 1 && HasSpecialNeeds[0] === 0) {
    params.append('HasSpecialNeeds', 'false');
  } else {
    params.delete('HasSpecialNeeds');
  }

  params.append('Pagination.Page', Page ?? '1');
  params.append('Pagination.PageSize', PageSize.toString());
  params.append('Sorting.Type', SortBy ?? '2');
  params.append('Sorting.Direction', '1');

  const response = await client.get<FilteredPetsResponse>('/pets/filtered', {
    params,
  });

  return response.data;
};

export const getFilteredPetsQueryOptions = (
  payload: FilteredPetsPayload = {},
) => {
  return queryOptions({
    queryKey: ['pets', 'filtered', payload],
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

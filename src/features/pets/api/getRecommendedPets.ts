import { PaginatedPet } from '@/features/pets/types';
import { authClient } from '@/lib/auth-client';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

type RecommendedPetsPayload = {
  token?: string;
  Page?: string;
  PageSize?: string;
};

type RecommendedPetsResponse = {
  data: {
    items: PaginatedPet[];
    page: number;
    pageSize: number;
    count: number;
  };
  message: string;
  errors: string[];
};

export const getRecommendedPets = async ({
  Page,
  PageSize,
  token,
}: RecommendedPetsPayload): Promise<RecommendedPetsResponse> => {
  const response = await authClient.get<RecommendedPetsResponse>(
    '/pets/recommended',
    {
      params: {
        'Pagination.Page': Page ?? 1,
        'Pagination.PageSize': PageSize ?? 9,
      },
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data;
};

export const getRecommendedPetsQueryOptions = (
  payload: RecommendedPetsPayload = {},
) => {
  return queryOptions({
    queryKey: [payload],
    queryFn: () =>
      getRecommendedPets({
        ...payload,
      }),
  });
};

type UseRecommendedPetsOptions = {
  payload?: RecommendedPetsPayload;
  queryConfig?: QueryConfig<typeof getRecommendedPetsQueryOptions>;
};

export const useRecommendedPets = ({
  queryConfig,
  payload,
}: UseRecommendedPetsOptions) => {
  return useQuery({
    ...getRecommendedPetsQueryOptions({ ...payload }),
    ...queryConfig,
  });
};

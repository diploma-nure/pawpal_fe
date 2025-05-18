import { Pet } from '@/features/pets/types';
import { authClient } from '@/lib/auth-client';
import { queryOptions } from '@tanstack/react-query';

type RecommendedPetsPayload = {
  token?: string;
  Page?: string;
};

type RecommendedPetsResponse = {
  data: {
    items: Pet[];
    page: number;
    pageSize: number;
    count: number;
  };
  message: string;
  errors: string[];
};

export const getRecommendedPets = async ({
  Page,
  token,
}: RecommendedPetsPayload): Promise<RecommendedPetsResponse> => {
  const response = await authClient.get<RecommendedPetsResponse>(
    '/pets/recommended',
    {
      params: {
        'Pagination.Page': Page ?? 1,
        'Pagination.PageSize': 9,
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

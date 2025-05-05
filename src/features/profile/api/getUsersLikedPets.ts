import { Pet } from '@/features/pets/types';
import { client } from '@/lib/api-client';

type GetUsersPetsLikeResponse = {
  data: Pet[];
  message: string;
  errors: string[] | null;
};

export const getUsersPetsLike = async (): Promise<GetUsersPetsLikeResponse> => {
  const response =
    await client.put<GetUsersPetsLikeResponse>(`/users/pets/liked`);

  return response.data;
};

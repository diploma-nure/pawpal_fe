import { Pet } from '@/features/pets/types';
import { authClient } from '@/lib/auth-client';

type GetUsersPetsLikedResponse = {
  data: Pet[];
  message: string;
  errors: string[] | null;
};

export const getUsersPetsLiked =
  async (): Promise<GetUsersPetsLikedResponse> => {
    const response =
      await authClient.get<GetUsersPetsLikedResponse>(`/users/pets/liked`);

    return response.data;
  };

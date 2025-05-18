import { authClient } from '@/lib/auth-client';

type LikePetResponse = {
  message: string;
  data: number;
  errors: string[];
};

type LikePetPayload = {
  petId: number;
};

export const likePet = async ({ petId }: LikePetPayload) => {
  const response = await authClient.patch<LikePetResponse>(
    `/pets/like/${petId}`,
  );

  return response.data;
};

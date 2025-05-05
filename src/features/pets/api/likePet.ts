import { client } from '@/lib/api-client';

type LikePetResponse = {
  message: string;
  data: number;
  errors: string[];
};

type LikePetPayload = {
  petId: number;
};

export const likePet = async ({ petId }: LikePetPayload) => {
  const response = await client.patch<LikePetResponse>(`/pets/like/${petId}`);

  return response.data;
};

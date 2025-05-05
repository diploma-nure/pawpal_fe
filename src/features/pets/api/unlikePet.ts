import { client } from '@/lib/api-client';

type UnlikePetResponse = {
  message: string;
  data: number;
  errors: string[];
};

type UnlikePetPayload = {
  petId: number;
};

export const unlikePet = async ({ petId }: UnlikePetPayload) => {
  const response = await client.patch<UnlikePetResponse>(
    `/pets/unlike/${petId}`,
  );

  return response.data;
};

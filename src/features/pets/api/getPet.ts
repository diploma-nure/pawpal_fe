import { Pet } from '@/features/pets/types';
import { client } from '@/lib/api-client';

type GetPetPayload = {
  id: string;
};

type GetPetResponse = {
  data: Pet;
  message: string;
  errors: string[] | null;
};

export const getPet = async ({
  id,
}: GetPetPayload): Promise<GetPetResponse> => {
  const response = await client.get<GetPetResponse>(`/pets/${id}`);

  return response.data;
};

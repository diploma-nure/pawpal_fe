import { authClient } from '@/lib/auth-client';

type DeletePetResponse = {
  data: number;
  message: string;
  errors: string[];
};

type DeletePetPayload = {
  petId: number;
};

export const deletePet = async (options: DeletePetPayload) => {
  const response = await authClient.delete<DeletePetResponse>(
    `/pets/${options.petId}`,
  );

  return response.data;
};

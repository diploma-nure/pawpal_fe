import { authClient } from '@/lib/auth-client';

type UnlikePetResponse = {
  message: string;
  data: number;
  errors: string[];
};

type UnlikePetPayload = {
  petId: number;
};

export const unlikePet = async ({ petId }: UnlikePetPayload) => {
  const response = await authClient.patch<UnlikePetResponse>(
    `/pets/unlike/${petId}`,
  );

  return response.data;
};

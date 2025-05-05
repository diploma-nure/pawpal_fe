import { client } from '@/lib/api-client';

type Feature = {
  id: number;
  feature: string;
};

type GetPetFeaturesResponse = {
  data: Feature[];
  message: string;
  errors: string[] | null;
};

export const getPetFeatures = async (): Promise<GetPetFeaturesResponse> => {
  const response = await client.get<GetPetFeaturesResponse>(`/pet-features`);

  return response.data;
};

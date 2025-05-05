import { PetAge, PetGender, PetSize, PetSpecies } from '@/features/pets/types';
import { client } from '@/lib/api-client';

type AddPetResponse = {
  data: number;
  message: string;
  errors: string[];
};

type AddPetPayload = {
  Name: string;
  Species: (typeof PetSpecies)[number]['value'];
  Gender: (typeof PetGender)[number]['value'];
  Size: (typeof PetSize)[number]['value'];
  Age: (typeof PetAge)[number]['value'];
  HasSpecialNeeds: boolean;
  FeaturesIds: number[];
  Description: string;
  Pictures: string[];
};

export const addPet = async (options: AddPetPayload) => {
  const response = await client.post<AddPetResponse>('/pets/add', {
    ...options,
  });

  return response.data;
};

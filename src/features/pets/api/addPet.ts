import { PetAge, PetGender, PetSize, PetSpecies } from '@/features/pets/types';
import { authClient } from '@/lib/auth-client';

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
  Pictures: File[];
};

export const addPet = async (options: AddPetPayload) => {
  const formData = new FormData();

  // Add all text fields to form data
  formData.append('Name', options.Name);
  formData.append('Species', options.Species.toString());
  formData.append('Gender', options.Gender.toString());
  formData.append('Size', options.Size.toString());
  formData.append('Age', options.Age.toString());
  formData.append('HasSpecialNeeds', options.HasSpecialNeeds.toString());
  formData.append('Description', options.Description);

  options.FeaturesIds.forEach((featureId, index) => {
    formData.append(`FeaturesIds[${index}]`, featureId.toString());
  });

  options.Pictures.forEach((file, index) => {
    formData.append(`Pictures[${index}]`, file);
  });

  const response = await authClient.post<AddPetResponse>(
    '/pets/add',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

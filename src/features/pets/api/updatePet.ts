import {
  PetAge,
  PetGender,
  PetPicture,
  PetSize,
  PetSpecies,
} from '@/features/pets/types';
import { authClient } from '@/lib/auth-client';

type UpdatePetResponse = {
  data: number;
  message: string;
  errors: string[];
};

type UpdatePetPayload = {
  Id: number;
  Name: string;
  Species: (typeof PetSpecies)[number]['value'];
  Gender: (typeof PetGender)[number]['value'];
  Size: (typeof PetSize)[number]['value'];
  Age: (typeof PetAge)[number]['value'];
  HasSpecialNeeds: boolean;
  FeaturesIds: number[];
  Description: string;
  Pictures: Array<File | PetPicture>;
};

export const updatePet = async (options: UpdatePetPayload) => {
  const formData = new FormData();
  formData.append('Id', options.Id.toString());

  formData.append('Name', options.Name);
  formData.append('Species', options.Species.toString());
  formData.append('Gender', options.Gender.toString());
  formData.append('Size', options.Size.toString());
  formData.append('Age', options.Age.toString());
  formData.append('HasSpecialNeeds', options.HasSpecialNeeds.toString());

  if (options.Description) {
    formData.append('Description', options.Description);
  }

  options.FeaturesIds.forEach((featureId) => {
    formData.append(`FeaturesIds`, featureId.toString());
  });

  options.Pictures.forEach((file, index) => {
    if (file instanceof File) {
      formData.append(`Pictures[${index}].File`, file);
      formData.append(`Pictures[${index}].Id`, '');
    } else {
      formData.append(`Pictures[${index}].Id`, file.id.toString());
      formData.append(`Pictures[${index}].File`, file.url);
    }
  });

  const response = await authClient.patch<UpdatePetResponse>(
    '/pets/update',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

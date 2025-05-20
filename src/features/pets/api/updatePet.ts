import { PetAge, PetGender, PetSize, PetSpecies } from '@/features/pets/types';
import { authClient } from '@/lib/auth-client';

type UpdatePetResponse = {
  data: number;
  message: string;
  errors: string[];
};

type UpdatePetPayload = {
  Id: number;
  Name?: string;
  Speies?: (typeof PetSpecies)[number]['value'];
  Gender?: (typeof PetGender)[number]['value'];
  Size?: (typeof PetSize)[number]['value'];
  Age?: (typeof PetAge)[number]['value'];
  HasSpecialNeeds?: boolean;
  FeaturesIds?: number[];
  Description?: string;
  Pictures?: File[];
};

export const updatePet = async (options: UpdatePetPayload) => {
  const formData = new FormData();

  // Add ID (required field)
  formData.append('Id', options.Id.toString());

  // Add optional text fields to form data if they exist
  if (options.Name) formData.append('Name', options.Name);
  if (options.Speies) formData.append('Speies', options.Speies.toString());
  if (options.Gender) formData.append('Gender', options.Gender.toString());
  if (options.Size) formData.append('Size', options.Size.toString());
  if (options.Age) formData.append('Age', options.Age.toString());
  if (options.HasSpecialNeeds !== undefined)
    formData.append('HasSpecialNeeds', options.HasSpecialNeeds.toString());
  if (options.Description) formData.append('Description', options.Description);

  // Add array of feature IDs if it exists
  if (options.FeaturesIds && options.FeaturesIds.length > 0) {
    options.FeaturesIds.forEach((featureId, index) => {
      formData.append(`FeaturesIds[${index}]`, featureId.toString());
    });
  }

  // Add picture files if they exist
  if (options.Pictures && options.Pictures.length > 0) {
    options.Pictures.forEach((file, index) => {
      formData.append(`Pictures[${index}]`, file);
    });
  }

  // Send as multipart/form-data (content-type will be set automatically)
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

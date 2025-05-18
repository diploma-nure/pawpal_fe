import { PetAge, PetGender, PetSize, PetSpecies } from '@/features/pets/types';
import { z } from 'zod';

export const aboutPetFormSchema = z.object({
  petType: z
    .number()
    .refine((value) => PetSpecies.map((p) => p.value).includes(value)),
  gender: z
    .number()
    .refine((value) => PetGender.map((p) => p.value).includes(value)),
  size: z
    .number()
    .refine((value) => PetSize.map((p) => p.value).includes(value)),
  age: z.number().refine((value) => PetAge.map((p) => p.value).includes(value)),
  hasSpecialNeeds: z.boolean().optional(),
  characteristics: z.number().or(z.array(z.number())).optional(),
});

export type AboutPetFormSchemaType = z.infer<typeof aboutPetFormSchema>;

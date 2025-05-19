import { PetAge, PetGender, PetSize, PetSpecies } from '@/features/pets/types';
import { z } from 'zod';

export const surveySchema = z.object({
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

  housingType: z.enum(['1', '2']),
  hasYard: z.enum(['true', 'false']).transform((val) => val === 'true'),
  allowPets: z.enum(['0', '1', '2']).transform((val) => Number(val)),
  hasOtherPets: z.enum(['true', 'false']).transform((val) => val === 'true'),
  hasChildren: z.enum(['true', 'false']).transform((val) => val === 'true'),

  hadPetsBefore: z.enum(['true', 'false']).transform((val) => val === 'true'),
  activityLevel: z.enum(['0', '1', '2']).transform((val) => Number(val)),
  willingToAdoptSpecialNeeds: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true'),

  understandsResponsibility: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true'),
  vacationPetCarePlan: z
    .string()
    .min(1, { message: 'Введіть план догляду за тваринкою' }),
  hasSufficientFinancialResources: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true'),
});

export type SurveyFormSchema = z.infer<typeof surveySchema>;

import { z } from 'zod';

export const lifeConditionFormSchema = z.object({
  housingType: z.enum(['apartment', 'house']),
  hasYard: z.enum(['yes', 'no']),
  allowPets: z.enum(['yes', 'no', 'unsure']),
  hasOtherPets: z.enum(['yes', 'no']),
  hasChildren: z.enum(['yes', 'no']),
});

export type LifeConditionFormSchemaType = z.infer<
  typeof lifeConditionFormSchema
>;

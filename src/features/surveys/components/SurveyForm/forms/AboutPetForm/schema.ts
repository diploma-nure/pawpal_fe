import { z } from 'zod';

export const aboutPetFormSchema = z.object({
  petType: z.enum(['cat', 'dog']),
  gender: z.enum(['male', 'female']),
  size: z.enum(['small', 'medium', 'large']),
  age: z.enum(['under1', '1to5', 'over5']),
  hasSpecialNeeds: z.enum(['yes', 'no']),
  characteristics: z.number(),
});

export type AboutPetFormSchemaType = z.infer<typeof aboutPetFormSchema>;

import { z } from 'zod';

export const experienceAndExpectationsFormSchema = z.object({
  hadPetsBefore: z.enum(['yes', 'no']),
  activityLevel: z.enum(['calm', 'moderate', 'active']),
  willingToAdoptSpecialNeeds: z.enum(['yes', 'no']),
});

export type ExperienceAndExpectationsFormSchemaType = z.infer<
  typeof experienceAndExpectationsFormSchema
>;

import { z } from 'zod';

export const experienceAndExpectationsFormSchema = z.object({
  hadPetsBefore: z.enum(['true', 'false']).transform((val) => val === 'true'),
  activityLevel: z.enum(['0', '1', '2']).transform((val) => Number(val)),
  willingToAdoptSpecialNeeds: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true'),
});

export type ExperienceAndExpectationsFormSchemaType = z.infer<
  typeof experienceAndExpectationsFormSchema
>;

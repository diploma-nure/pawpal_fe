import { z } from 'zod';

export const experienceAndExpectationsFormSchema = z.object({
  hadPetsBefore: z.enum(['true', 'false'], {
    message: 'Оберіть досвід утримання тварин',
  }),
  activityLevel: z.enum(['0', '1', '2'], {
    message: 'Оберіть рівень активності',
  }),
  willingToAdoptSpecialNeeds: z.enum(['true', 'false'], {
    message: 'Оберіть готовність до прийняття тварин з особливими потребами',
  }),
});

export type ExperienceAndExpectationsFormSchemaType = z.infer<
  typeof experienceAndExpectationsFormSchema
>;

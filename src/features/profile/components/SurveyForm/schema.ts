import { z } from 'zod';

export const surveySchema = z.object({
  petType: z
    .array(z.number())
    .min(1, { message: 'Виберіть хоча б один тип тварини' }),
  gender: z.array(z.number()).min(1, { message: 'Виберіть хоча б одну стать' }),
  size: z.array(z.number()).min(1, { message: 'Виберіть хоча б один розмір' }),
  age: z.array(z.number()).min(1, { message: 'Виберіть хоча б один вік' }),
  characteristics: z
    .array(z.number())
    .min(1, { message: 'Виберіть хоча б одну характеристику' }),
  housingType: z.enum(['1', '2'], { message: 'Оберіть тип житла' }),
  allowPets: z.enum(['0', '1', '2'], {
    message: 'Оберіть дозвіл на утримання тварин',
  }),

  hasSpecialNeeds: z.enum(['true', 'false'], {
    message: 'Оберіть варіант для особливих потреб',
  }),
  hasYard: z.enum(['true', 'false'], { message: 'Оберіть наявність двору' }),
  hasOtherPets: z.enum(['true', 'false'], {
    message: 'Оберіть наявність інших тварин',
  }),
  hasChildren: z.enum(['true', 'false'], {
    message: 'Оберіть наявність дітей',
  }),
  hadPetsBefore: z.enum(['true', 'false'], {
    message: 'Оберіть досвід утримання тварин',
  }),
  willingToAdoptSpecialNeeds: z.enum(['true', 'false'], {
    message: 'Оберіть готовність до прийняття тварин з особливими потребами',
  }),
  hasSufficientFinancialResources: z.enum(['true', 'false'], {
    message: 'Підтвердьте наявність достатніх фінансових ресурсів',
  }),

  understandsResponsibility: z.enum(['true', 'false'], {
    message: 'Підтвердьте розуміння відповідальності',
  }),
  activityLevel: z.enum(['0', '1', '2'], {
    message: 'Оберіть рівень активності',
  }),
  vacationPetCarePlan: z
    .string()
    .min(1, { message: 'Введіть план догляду за тваринкою під час відпустки' }),
});

export type SurveyFormSchema = z.infer<typeof surveySchema>;

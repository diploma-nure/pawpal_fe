import { z } from 'zod';

export const aboutPetFormSchema = z.object({
  petType: z
    .array(z.number())
    .min(1, { message: 'Виберіть хоча б один тип тварини' }),
  gender: z.array(z.number()).min(1, { message: 'Виберіть хоча б одну стать' }),
  size: z.array(z.number()).min(1, { message: 'Виберіть хоча б один розмір' }),
  age: z.array(z.number()).min(1, { message: 'Виберіть хоча б один вік' }),
  characteristics: z
    .array(z.number())
    .min(1, { message: 'Виберіть хоча б одну характеристику' }),
  hasSpecialNeeds: z.enum(['true', 'false'], {
    message: 'Оберіть варіант для особливих потреб',
  }),
});

export type AboutPetFormSchemaType = z.infer<typeof aboutPetFormSchema>;

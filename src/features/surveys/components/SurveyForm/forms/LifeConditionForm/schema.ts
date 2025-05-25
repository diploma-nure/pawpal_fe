import { z } from 'zod';

export const lifeConditionFormSchema = z.object({
  housingType: z.enum(['1', '2'], { message: 'Оберіть тип житла' }),
  hasYard: z.enum(['true', 'false'], { message: 'Оберіть наявність двору' }),
  allowPets: z.enum(['0', '1', '2'], {
    message: 'Оберіть дозвіл на утримання тварин',
  }),
  hasOtherPets: z.enum(['true', 'false'], {
    message: 'Оберіть наявність інших тварин',
  }),
  hasChildren: z.enum(['true', 'false'], {
    message: 'Оберіть наявність дітей',
  }),
});

export type LifeConditionFormSchemaType = z.infer<
  typeof lifeConditionFormSchema
>;

import { z } from 'zod';

export const lifeConditionFormSchema = z.object({
  housingType: z.enum(['1', '2']), // 1 - приватний будинок, 2 - квартира
  hasYard: z.enum(['true', 'false']).transform((val) => val === 'true'),
  allowPets: z.enum(['0', '1', '2']).transform((val) => Number(val)), // 0 - не впевнений, 1 - ні, 2 - так
  hasOtherPets: z.enum(['true', 'false']).transform((val) => val === 'true'),
  hasChildren: z.enum(['true', 'false']).transform((val) => val === 'true'),
});

export type LifeConditionFormSchemaType = z.infer<
  typeof lifeConditionFormSchema
>;

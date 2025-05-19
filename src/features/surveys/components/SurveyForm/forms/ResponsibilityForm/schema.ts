import { z } from 'zod';

export const responsibilityFormSchema = z.object({
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

export type ResponsibilityFormSchemaType = z.infer<
  typeof responsibilityFormSchema
>;

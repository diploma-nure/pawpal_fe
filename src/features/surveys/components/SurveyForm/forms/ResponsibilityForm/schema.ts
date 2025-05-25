import { z } from 'zod';

export const responsibilityFormSchema = z.object({
  understandsResponsibility: z.enum(['true', 'false'], {
    message: 'Підтвердьте розуміння відповідальності',
  }),
  vacationPetCarePlan: z
    .string()
    .min(1, { message: 'Введіть план догляду за тваринкою під час відпустки' }),
  hasSufficientFinancialResources: z.enum(['true', 'false'], {
    message: 'Підтвердьте наявність достатніх фінансових ресурсів',
  }),
});

export type ResponsibilityFormSchemaType = z.infer<
  typeof responsibilityFormSchema
>;

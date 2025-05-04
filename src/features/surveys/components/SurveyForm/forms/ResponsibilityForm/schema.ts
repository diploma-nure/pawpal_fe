import { z } from 'zod';

export const responsibilityFormSchema = z.object({
  understandResponsibility: z.enum(['yes', 'no']),
  carePlanning: z.string(),
  financialCapabale: z.enum(['yes', 'no']),
});

export type ResponsibilityFormSchemaType = z.infer<
  typeof responsibilityFormSchema
>;

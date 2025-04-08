import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Введіть e-mail').email('E-mail не коректний'),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

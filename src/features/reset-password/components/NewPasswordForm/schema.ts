import { z } from 'zod';

export const newPasswordSchema = z
  .object({
    password: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
    confirmPassword: z.string().min(6, 'Пароль має містити мінімум 6 символів'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Паролі не співпадають',
  });

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;

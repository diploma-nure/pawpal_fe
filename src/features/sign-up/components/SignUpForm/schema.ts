import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().min(1, 'Введіть e-mail').email('E-mail не коректний'),
  password: z
    .string()
    .min(1, 'Введіть пароль')
    .min(6, 'Пароль повинен містити не менше 6 символів'),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

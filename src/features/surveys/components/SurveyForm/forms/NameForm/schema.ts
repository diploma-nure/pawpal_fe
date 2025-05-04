import { z } from 'zod';

export const nameFormSchema = z.object({
  fullName: z.string().min(1, "Введіть прізвище та ім'я"),
  phone: z
    .string()
    .min(1, 'Введіть номер телефону')
    .regex(/^\+?[0-9]{10,15}$/, 'Телефон не коректний'),
  location: z.string().min(1, 'Введіть місце проживання'),
});

export type NameFormSchemaType = z.infer<typeof nameFormSchema>;

import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Введіть прізвище та ім'я"),
  email: z.string().min(1, 'Введіть e-mail').email('E-mail не коректний'),
  phone: z
    .string()
    .min(1, 'Введіть номер телефону')
    .regex(/^\+?[0-9]{10,15}$/, 'Телефон не коректний'),
  location: z.string().min(1, 'Введіть місце проживання'),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

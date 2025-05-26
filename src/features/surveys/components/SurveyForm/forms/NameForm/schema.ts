import { z } from 'zod';

export const nameFormSchema = z.object({
  fullName: z.string().min(1, "Введіть прізвище та ім'я"),
  phone: z
    .string()
    .min(1, 'Введіть номер телефону')
    .regex(
      /^(\+?38)?0\d{9}$/,
      'Некоректний формат українського номеру телефону',
    )
    .transform((val) => {
      const cleaned = val.replace(/\D/g, '');

      if (cleaned.startsWith('380')) {
        return '+' + cleaned;
      } else if (cleaned.startsWith('0') && cleaned.length === 10) {
        return '+38' + cleaned;
      } else if (cleaned.length === 9) {
        return '+380' + cleaned;
      }

      return '+38' + cleaned;
    }),
  location: z.string().min(1, 'Введіть місце проживання'),
});

export type NameFormSchemaType = z.infer<typeof nameFormSchema>;

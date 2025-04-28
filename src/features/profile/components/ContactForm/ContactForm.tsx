'use client';

import { Button, Input } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { contactFormSchema, ContactFormSchemaType } from './schema';
import styles from './styles.module.scss';

interface ContactFormProps {
  initialValues?: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  onSubmit?: (data: ContactFormSchemaType) => void;
}

export const ContactForm: FC<ContactFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: initialValues?.fullName || '',
      email: initialValues?.email || '',
      phone: initialValues?.phone || '',
      location: initialValues?.location || '',
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  });

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.title}>
        <h3 className="heading3">Контактна інформація</h3>
      </div>

      <div className={styles.formFields}>
        <Input
          name="fullName"
          control={control}
          label="Прізвище ім'я"
          error={errors.fullName}
          placeholder="Аліна Світоліна"
        />

        <Input
          name="email"
          control={control}
          label="Email"
          error={errors.email}
          placeholder="example@gmail.com"
          type="email"
        />

        <Input
          name="phone"
          control={control}
          label="Номер телефону"
          error={errors.phone}
          placeholder="+380997462594"
        />

        <Input
          name="location"
          control={control}
          label="Місце проживання"
          error={errors.location}
          placeholder="Київ, Оболонський район"
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button type="submit">Зберегти зміни</Button>
      </div>
    </form>
  );
};

'use client';

import { Button, Input } from '@/components/ui';
import { useGetUsersInfo } from '@/features/profile/api/getUsersInfo';
import { useUpdateUsersInfo } from '@/features/profile/hooks';
import { useGetUser } from '@/features/profile/hooks/useGetUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { contactFormSchema, ContactFormSchemaType } from './schema';
import styles from './styles.module.scss';

export const ContactForm: FC = () => {
  const user = useGetUser();

  const { data } = useGetUsersInfo({
    payload: {
      id: user?.id as unknown as number,
    },
  });

  const { mutate } = useUpdateUsersInfo();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        fullName: data.data.fullName || '',
        email: data.data.email || '',
        phone: data.data.phoneNumber || '',
        location: data.data.address || '',
      });
    }
  }, [data, reset]);

  const handleFormSubmit = handleSubmit((data) => {
    mutate({
      fullName: data.fullName,
      phoneNumber: data.phone,
      address: data.location,
    });
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
          disabled
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

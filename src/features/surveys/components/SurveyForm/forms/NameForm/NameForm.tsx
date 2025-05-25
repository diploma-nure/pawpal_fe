'use client';

import { Button, Input } from '@/components/ui';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { useUpdateUsersInfo } from '@/features/profile/hooks';
import {
  nameFormSchema,
  NameFormSchemaType,
} from '@/features/surveys/components/SurveyForm/forms/NameForm/schema';
import { useForwardBack } from '@/features/surveys/hooks/useForwardBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const NameForm = () => {
  const { forward } = useForwardBack();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NameFormSchemaType>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      location: '',
    },
  });
  const { mutate } = useUpdateUsersInfo();

  const handleFormSubmit = handleSubmit((data) => {
    mutate({
      fullName: data.fullName,
      phoneNumber: data.phone,
      address: data.location,
    });
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <ErrorBanner errors={errors} />
      <Input
        control={control}
        name="fullName"
        label="Прізвище ім'я"
        placeholder="Ковальчук Анна"
      />
      <Input
        control={control}
        name="phone"
        label="Номер телефону"
        placeholder="+380997462594"
      />
      <Input
        control={control}
        name="location"
        label="Місце проживання"
        placeholder="Київ"
      />
      <Button>Підтвердити</Button>
    </form>
  );
};

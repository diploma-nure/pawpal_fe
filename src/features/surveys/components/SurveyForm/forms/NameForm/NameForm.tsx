'use client';

import { Button, Input } from '@/components/ui';
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

  const handleFormSubmit = handleSubmit((data) => {
    console.log(data);
    forward();
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        control={control}
        name="fullName"
        error={errors.fullName}
        label="Прізвище ім'я"
        placeholder="Ковальчук Анна"
      />
      <Input
        control={control}
        name="phone"
        error={errors.phone}
        label="Номер телефону"
        placeholder="+380997462594"
      />
      <Input
        control={control}
        name="location"
        error={errors.location}
        label="Місце проживання"
        placeholder="Київ"
      />
      <Button>Підтвердити</Button>
    </form>
  );
};

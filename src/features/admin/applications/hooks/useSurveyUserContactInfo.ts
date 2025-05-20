import { useGetUsersInfo } from '@/features/profile/api/getUsersInfo';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useSurveyContactInfo = (userId: number) => {
  const { data } = useGetUsersInfo({
    payload: {
      id: userId as unknown as number,
    },
  });

  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
    },
  });

  useEffect(() => {
    reset({
      fullName: data?.data.fullName ?? '',
      phoneNumber: data?.data.phoneNumber ?? '',
      email: data?.data.email ?? '',
      address: data?.data.address ?? '',
    });
  }, [data, reset]);

  return {
    data,
    contactControl: control,
    errors,
  };
};

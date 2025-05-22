import { useGetUser } from '@/features/profile/hooks';
import dayjs from 'dayjs';

export const useTokenValid = (): boolean => {
  const user = useGetUser();
  const isValid = !!user?.exp && !dayjs(user.exp * 1000).isBefore(dayjs());

  return isValid;
};

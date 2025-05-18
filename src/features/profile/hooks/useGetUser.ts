import { User } from '@/features/profile/types';
import Cookies from 'js-cookie';

export const useGetUser = () => {
  const token = Cookies.get('token');

  if (!token) return null;

  try {
    const payload = token.split('.')[1];

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    const decodedPayload: User = JSON.parse(atob(base64));

    return decodedPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

import { API_URL } from '@/lib/api-client';
import { LoginResponse } from '../types/LoginResponse';

type LoginGooglePayload = {
  token: string;
};

export const loginGoogle = async ({
  token,
}: LoginGooglePayload): Promise<LoginResponse> => {
  const response = await fetch(API_URL + '/auth/login/google', {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to log in with Google');
  }

  const data: LoginResponse = await response.json();

  return data;
};

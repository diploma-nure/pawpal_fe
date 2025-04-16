import { client } from '@/lib/api-client';
import { LoginResponse } from '../types/LoginResponse';

type LoginGooglePayload = {
  token: string;
};

export const loginGoogle = async ({ token }: LoginGooglePayload) => {
  const response = await client.post<LoginResponse>('/auth/login/google', {
    token,
  });

  return response.data;
};

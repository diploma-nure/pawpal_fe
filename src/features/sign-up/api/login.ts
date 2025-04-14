import { client } from '@/lib/api-client';
import { LoginResponse } from '../types/LoginResponse';

type LoginPayload = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginPayload) => {
  const response = await client.post<LoginResponse>('/auth/login', {
    email,
    password,
  });

  return response.data;
};

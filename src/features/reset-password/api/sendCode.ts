import { client } from '@/lib/api-client';

type SendCodeResponse = {
  message: string;
  data: number;
  errors: string[];
};

export const sendCode = async (email: string) => {
  const response = await client.post<SendCodeResponse>(
    '/auth/password/recovery/send-code',
    {
      email,
    },
  );
  return response.data;
};

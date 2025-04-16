import { client } from '@/lib/api-client';

type ValidateCodePayload = {
  userId: number;
  recoverCode: string;
};

type ValidateCodeResponse = {
  data: number;
  message: string;
  errors: string[];
};

export const sendCode = async ({
  userId,
  recoverCode,
}: ValidateCodePayload) => {
  const response = await client.post<ValidateCodeResponse>(
    '/auth/password/recovery/validate-code',
    {
      userId,
      recoverCode,
    },
  );
  return response.data.message;
};

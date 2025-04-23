import { client } from '@/lib/api-client';

type ValidateCodePayload = {
  userId: number;
  recoveryCode: string;
};

type ValidateCodeResponse = {
  data: number;
  message: string;
  errors: string[];
};

export const validateCode = async ({
  userId,
  recoveryCode,
}: ValidateCodePayload) => {
  const response = await client.post<ValidateCodeResponse>(
    '/auth/password/recovery/validate-code',
    {
      userId,
      recoveryCode,
    },
  );
  return response.data;
};

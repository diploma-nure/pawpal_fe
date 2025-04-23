import { client } from '@/lib/api-client';

type ChangePasswordResponse = {
  message: string;
  data: number;
  errors: string[];
};

type ChangePasswordPayload = {
  userId: number;
  newPassword1: string;
  newPassword2: string;
  recoveryCode: string;
};

export const changePassword = async ({
  userId,
  newPassword1,
  newPassword2,
  recoveryCode,
}: ChangePasswordPayload) => {
  const response = await client.patch<ChangePasswordResponse>(
    '/auth/password/change',
    {
      userId,
      newPassword1,
      newPassword2,
      recoveryCode,
    },
  );

  return response.data;
};

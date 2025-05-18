import { authClient } from '@/lib/auth-client';

type Payload = {
  fullName: string;
  phoneNumber: string;
  address: string;
};

type UpdateUsersInfoResponse = {
  data: number;
  message: string;
  errors: string[] | null;
};

export const updateUsersInfo = async (
  options: Payload,
): Promise<UpdateUsersInfoResponse> => {
  const response = await authClient.put<UpdateUsersInfoResponse>(
    `/users/info/update`,
    {
      ...options,
    },
  );

  return response.data;
};

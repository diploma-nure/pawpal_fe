import { client } from '@/lib/api-client';

type Payload = {
  id: number;
};

type GetUsersInfoResponse = {
  data: {
    id: number;
    email: string;
    profilePictureUrl: string;
    fullName: string;
    phoneNumber: string;
    address: string;
  };
  message: string;
  errors: string[] | null;
};

export const getUsersInfo = async ({
  id,
}: Payload): Promise<GetUsersInfoResponse> => {
  const response = await client.get<GetUsersInfoResponse>(`/users/info`, {
    params: {
      Id: id,
    },
  });

  return response.data;
};

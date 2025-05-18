import { authClient } from '@/lib/auth-client';
import { QueryConfig } from '@/lib/reactQuery';
import { queryOptions, useQuery } from '@tanstack/react-query';

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
  const response = await authClient.get<GetUsersInfoResponse>(`/users/info`, {
    params: {
      Id: id,
    },
  });

  return response.data;
};

export const getUserInfoQueryOptions = (payload: Payload) => {
  return queryOptions({
    queryKey: ['userInfo'],
    queryFn: () =>
      getUsersInfo({
        ...payload,
      }),
  });
};

type UseGetUsersInfoOptions = {
  payload: Payload;
  queryConfig?: QueryConfig<typeof getUserInfoQueryOptions>;
};

export const useGetUsersInfo = ({
  queryConfig,
  payload,
}: UseGetUsersInfoOptions) => {
  return useQuery({
    ...getUserInfoQueryOptions({ ...payload }),
    ...queryConfig,
  });
};

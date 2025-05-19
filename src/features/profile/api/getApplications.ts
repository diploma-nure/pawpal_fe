import { Application } from '@/features/admin/applications/types';
import { authClient } from '@/lib/auth-client';

type GetApplicationsResponse = {
  data: {
    items: Application[];
    page: number;
    pageSize: 0;
    count: 0;
  };
  message: string;
  errors: string[] | null;
};

export type GetApplicationsPayload = {
  page: number;
  status: number | null;
};

export const getApplications = async ({
  page = 1,
  status = null,
}: GetApplicationsPayload): Promise<GetApplicationsResponse> => {
  const params = {
    'Pagination.Page': page,
    'Pagination.PageSize': 9,
  };

  if (status) {
    Object.assign(params, {
      Status: status,
    });
  }

  const response = await authClient.get<GetApplicationsResponse>(
    `/applications/filtered`,
    {
      params: {
        ...params,
      },
    },
  );

  return response.data;
};

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
  status: number[] | null;
};

export const getApplications = async ({
  page = 1,
  status = null,
}: GetApplicationsPayload): Promise<GetApplicationsResponse> => {
  const params = new URLSearchParams();

  params.append('Pagination.Page', page.toString());
  params.append('Pagination.PageSize', '5');

  if (status !== null && status !== undefined) {
    status.forEach((s) => {
      params.append(`Statuses`, s.toString());
    });
  }

  const response = await authClient.get<GetApplicationsResponse>(
    `/applications/filtered`,
    {
      params,
    },
  );

  return response.data;
};

import { authClient } from '@/lib/auth-client';

type SubmitApplicationResponse = {
  message: string;
  data: number;
  errors: string[];
};

type SubmitApplicationPayload = {
  petId: number;
};

export const submitApplication = async ({
  petId,
}: SubmitApplicationPayload) => {
  const response = await authClient.post<SubmitApplicationResponse>(
    `/applications/submit`,
    {
      petId,
    },
  );

  return response.data;
};

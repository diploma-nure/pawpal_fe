import { completeSurvey } from '@/features/surveys/api/completeSurvey';
import { MutationConfig } from '@/lib/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UseCompleteSurveyOptions = {
  config?: MutationConfig<typeof completeSurvey>;
};

export const useCompleteSurvey = ({
  config,
}: UseCompleteSurveyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeSurvey,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['userSurvey'] });
      if (config?.onSuccess) config.onSuccess(...args);
    },
    ...config,
  });
};

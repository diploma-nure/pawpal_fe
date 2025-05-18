import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CURRENT_STEP_KEY = 'survey_current_step';

type UseForwardBack = {
  forward: () => void;
  back: () => void;
};

export function useForwardBack(): UseForwardBack {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let currentStep = Number(searchParams.get('currentStep'));

  if (!currentStep || isNaN(Number(currentStep))) {
    currentStep = 1;
  }

  const saveStepToLocalStorage = (step: number) => {
    try {
      localStorage.setItem(CURRENT_STEP_KEY, String(step));
    } catch (error) {
      console.error('Error saving step to localStorage:', error);
    }
  };

  const forward = () => {
    const nextStep = currentStep + 1;
    saveStepToLocalStorage(nextStep);
    push(pathname + `?currentStep=${nextStep}`);
  };

  const back = () => {
    if (currentStep === 1) return;
    const prevStep = currentStep - 1;
    saveStepToLocalStorage(prevStep);
    push(pathname + `?currentStep=${prevStep}`);
  };

  return {
    forward,
    back,
  };
}

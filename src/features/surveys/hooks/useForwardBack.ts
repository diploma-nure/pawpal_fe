import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

  const forward = () => {
    push(pathname + `?currentStep=${currentStep + 1}`);
  };

  const back = () => {
    push(pathname + `?currentStep=${currentStep - 1}`);
  };

  return {
    forward,
    back,
  };
}

'use client';

import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

export const RedirectButton = () => {
  const { push } = useRouter();

  return <Button onClick={() => push('/pets')}>Знайти друга</Button>;
};

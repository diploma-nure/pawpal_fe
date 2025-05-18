'use client';

import { Button } from '@/components/ui';
import { getError } from '@/features/pets/components/ErrorText/getError';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

type Props = {
  text: string;
};

export const ErrorText: FC<Props> = ({ text }) => {
  const errorType = getError(text);
  const { push } = useRouter();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <h1 className="heading3">{errorType.message}</h1>
      <Button onClick={() => push(errorType.redirectUrl ?? '/')}>
        Спробувати
      </Button>

      <Button onClick={() => push('/')}>Повернутись на головну сторінку</Button>
    </div>
  );
};

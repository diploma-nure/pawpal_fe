'use client';
import { Container } from '@/components/layout';
import { ErrorText } from '@/features/pets/components/ErrorText/ErrorText';

// Error boundaries must be Client Components

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <Container>
      <ErrorText text={error.message} />
    </Container>
  );
}

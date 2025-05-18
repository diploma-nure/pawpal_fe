'use client';

import { Container, Footer, Header } from '@/components/layout';
import { Button } from '@/components/ui';
import { colors } from '@/styles/colors';
import { useRouter } from 'next/navigation';
import styles from './(home)/page.module.scss';

export default function NotFound() {
  const { push } = useRouter();

  return (
    <>
      <Header bgColor={colors.beige} />

      <main className={styles.main}>
        <Container>
          <h1 className="heading1">Сторінка не знайдена :(</h1>

          <Button
            onClick={() => {
              push('/');
            }}
            style={{
              marginInline: 'auto',
              marginBlock: '20px',
            }}
          >
            Повернутись на головну сторінку
          </Button>
        </Container>
      </main>
      <Footer />
    </>
  );
}

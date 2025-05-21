import { Footer, Header } from '@/components/layout';
import { colors } from '@/styles/colors';
import { Metadata } from 'next';
import { Suspense } from 'react';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'PawPal',
  description: 'PawPal - your best friend in pet adoption',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header bgColor={colors.beige} />
      <main className={styles.main}>
        <Suspense>{children}</Suspense>
      </main>
      <Footer />
    </>
  );
}

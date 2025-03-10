import { Header } from '@/components/layout';
import { Metadata } from 'next';
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
      <Header />
      <main className={styles.main}>{children}</main>;
    </>
  );
}

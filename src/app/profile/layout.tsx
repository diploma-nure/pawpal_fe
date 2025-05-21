import { Footer, Header } from '@/components/layout';
import { User } from '@/features/profile/types';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'PawPal',
  description: 'PawPal - your best friend in pet adoption',
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token');
  const user: User | null = token?.value
    ? JSON.parse(
        Buffer.from(token?.value.split('.')[1], 'base64url').toString('utf-8'),
      )
    : null;

  if (!user || dayjs(user.exp * 1000).isBefore(dayjs())) {
    redirect('/log-in');
  }

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

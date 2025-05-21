import { AdminHeader, Container } from '@/components/layout';
import { User } from '@/features/profile/types';
import { colors } from '@/styles/colors';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './style.module.scss';

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Readonly<Props>) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token');
  const user: User | null = token?.value
    ? JSON.parse(
        Buffer.from(token?.value.split('.')[1], 'base64url').toString('utf-8'),
      )
    : null;

  if (
    user?.role !== 'Admin' ||
    (user && dayjs(user.exp * 1000).isBefore(dayjs()))
  ) {
    redirect('/');
  }

  return (
    <>
      <AdminHeader bgColor={colors.beige} />
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
    </>
  );
}

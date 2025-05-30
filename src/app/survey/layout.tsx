import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token?.value) {
    redirect('/');
  }

  return <main className={styles.main}>{children}</main>;
}

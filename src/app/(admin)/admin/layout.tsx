'use client';

import { AdminHeader, Container } from '@/components/layout';
import { colors } from '@/styles/colors';
import { ReactNode } from 'react';
import styles from './style.module.scss';

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<Props>) {
  return (
    <>
      <AdminHeader bgColor={colors.beige} />
      <main className={styles.main}>
        <Container>{children}</Container>
      </main>
    </>
  );
}

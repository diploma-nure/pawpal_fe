'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import styles from './styles.module.scss';

export interface NavLinkProps {
  children: ReactNode;
  href: string;
}

export function NavLink({ children, href }: NavLinkProps) {
  const pathname = usePathname();
  if (href === pathname) {
    return (
      <span className={clsx(styles.navLink, styles.navLink__active)}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} className={styles.navLink}>
      {children}
    </Link>
  );
}

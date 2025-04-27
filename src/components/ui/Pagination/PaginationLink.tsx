import Link from 'next/link';
import { ReactNode } from 'react';

interface PaginationLinkProps {
  children: ReactNode;
  enabled: boolean;
  href: string;
}

export function PaginationLink({
  children,
  enabled,
  href,
}: PaginationLinkProps) {
  if (!enabled) {
    return <span>{children}</span>;
  }
  return <Link href={href}>{children}</Link>;
}

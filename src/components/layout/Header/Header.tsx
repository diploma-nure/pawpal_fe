'use client';

import { Button, Icon } from '@/components/ui';
import { Menu } from '@/components/ui/Menu';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Container } from '../Container/Container';
import styles from './styles.module.scss';

type Props = {
  bgColor?: string;
};

export const Header: FC<Props> = ({ bgColor }) => {
  const { push } = useRouter();

  return (
    <header style={{ backgroundColor: bgColor }}>
      <Container>
        <div className={clsx('grid', styles.header)}>
          <div className="col-desktop-1-2 col-tablet-1-1 col-1-1">
            <Icon width={83} height={70} name="logo" />
          </div>

          <nav
            className={clsx(
              'col-desktop-4-9 col-tablet-2-5 col-1-2',
              styles.navigation_container,
            )}
          >
            <ul className={styles.navigation}>
              <Link href="/#about-us">Про нас</Link>
              <Link href="/#how-we-work">Як працюємо</Link>
              <Link href="/#reviews">Відгуки</Link>
              <Link href="/#contacts">Контакти</Link>
            </ul>
          </nav>

          <div
            className={clsx(
              'col-desktop-11-12 col-tablet-6-6 col-2-2',
              styles.loginButton,
            )}
          >
            <Button
              variant="link"
              rightIcon={() => <Icon name="log-in" />}
              onClick={() => push('log-in')}
            >
              Увійти
            </Button>

            <Menu />
          </div>
        </div>
      </Container>
    </header>
  );
};

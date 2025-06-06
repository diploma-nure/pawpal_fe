'use client';

import { Button, Icon } from '@/components/ui';
import { Menu } from '@/components/ui/Menu';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Container } from '../Container/Container';
import styles from './styles.module.scss';

type Props = {
  bgColor?: string;
};

export const AdminHeader: FC<Props> = ({ bgColor }) => {
  const { push } = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.clear();
    signOut();
    push('/');
  };

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
              <ul className={styles.navigation}>
                <li>
                  <Link href="/admin/pets">Тваринки</Link>
                </li>
                <li>
                  <Link href="/admin/applications">Заявки</Link>
                </li>
                <li>
                  <Link href="/admin/meetings">Відеоконференції</Link>
                </li>
              </ul>
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
              rightIcon={() => <Icon name="logout" />}
              onClick={handleLogout}
            >
              Вийти
            </Button>

            <div className={styles.menuWrapper}>
              <Menu />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

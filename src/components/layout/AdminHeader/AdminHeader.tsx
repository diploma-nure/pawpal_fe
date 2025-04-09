'use client';

import { Button, Icon } from '@/components/ui';
import clsx from 'clsx';
import { FC } from 'react';
import { Container } from '../Container/Container';
import styles from './styles.module.scss';

type Props = {
  bgColor?: string;
};

export const AdminHeader: FC<Props> = ({ bgColor }) => {
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
              <li>Тваринки</li>
              <li>Заявки</li>
              <li>Відеоконференції</li>
            </ul>
          </nav>

          <div
            className={clsx(
              'col-desktop-11-12 col-tablet-6-6 col-2-2',
              styles.loginButton,
            )}
          >
            <Button variant="link" rightIcon={() => <Icon name="logout" />}>
              Вийти
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

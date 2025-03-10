'use client';

import { Button, Icon } from '@/components/ui';
import clsx from 'clsx';
import { Container } from '../Container/Container';
import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header>
      <Container>
        <div className={clsx('grid', styles.header)}>
          <div className="col-desktop-1-2">
            <Icon width={83} height={70} name="logo" />
          </div>

          <nav className="col-desktop-4-9">
            <ul className={styles.navigation}>
              <li>Про нас</li>
              <li>Відгуки</li>
              <li>Як працюємо</li>
              <li>Контакти</li>
            </ul>
          </nav>

          <div className={clsx('col-desktop-11-12', styles.loginButton)}>
            <Button variant="link" rightIcon={() => <Icon name="log-in" />}>
              Увійти
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

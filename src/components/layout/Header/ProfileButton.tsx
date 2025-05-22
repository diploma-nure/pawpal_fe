'use client';

import { Button, Icon } from '@/components/ui';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';

export const ProfileButton: FC = () => {
  const { push } = useRouter();
  const [isClient, setIsClient] = useState(false);

  const token = Cookies.get('token');

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          {!token && (
            <Button
              className={styles.profileButton}
              variant="link"
              rightIcon={() => <Icon name="log-in" />}
              onClick={() => push('/log-in')}
            >
              Увійти
            </Button>
          )}

          {token && (
            <Button
              className={styles.profileButton}
              variant="link"
              rightIcon={() => <Icon name="user" />}
              onClick={() => push('/profile')}
            >
              Профіль
            </Button>
          )}
        </>
      )}
    </>
  );
};

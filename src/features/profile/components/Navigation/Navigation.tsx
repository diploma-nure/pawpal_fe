'use client';

import PlaceholderAvatar from '@/assets/images/PlaceholderAvatar.jpg';
import { Button, Icon } from '@/components/ui';
import { NavLink } from '@/features/profile/components/NavLink';
import { ProfileTab } from '@/features/profile/constants/tabs';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './styles.module.scss';

export const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.navigation}>
      <div className={styles.avatar}>
        <Image
          className={styles.avatar__image}
          src={session?.user?.image ?? PlaceholderAvatar}
          width={64}
          height={64}
          alt={`avatar-${session?.user?.name}`}
        />

        <p className={styles.avatar__name}>{session?.user?.name}</p>
      </div>

      <div className={styles.linkList}>
        <NavLink href={'/profile/' + ProfileTab.Contacts}>
          Контактна інформація
        </NavLink>

        <NavLink href={'/profile/' + ProfileTab.Liked}>Збережене</NavLink>

        <NavLink href={'/profile/' + ProfileTab.Surveys}>Анкетування</NavLink>

        <NavLink href={'/profile/' + ProfileTab.Requests}>Мої заявки</NavLink>

        <Button
          variant="link"
          rightIcon={() => <Icon name="logout" width={24} height={24} />}
          onClick={() => signOut()}
          className={styles.logOut}
        >
          Вийти
        </Button>
      </div>
    </div>
  );
};
